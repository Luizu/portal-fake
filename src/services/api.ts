import axios, { AxiosError, AxiosInstance } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined): AxiosInstance {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['app.token']}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      // eslint-disable-next-line no-console
      console.log(error.response);

      if (error.response.status === 401) {
        if (error.response.data.message === 'JWT token expired') {
          cookies = parseCookies(ctx);

          const { 'app.refreshToken': refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post('/refresh', {
                refreshToken,
              })
              .then(response => {
                const { token } = response.data;

                setCookie(ctx, 'app.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                setCookie(ctx, 'app.refreshToken', response.data.refreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                api.defaults.headers.common.Authorization = `Bearer ${token}`;

                failedRequestsQueue.forEach(request =>
                  request.onSuccess(token),
                );
                failedRequestsQueue = [];
              })
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err));
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }

        if (process.browser) {
          // signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
}
