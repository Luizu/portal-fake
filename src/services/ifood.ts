import axios, { AxiosError, AxiosInstance } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupIfoodClient(ctx = undefined): AxiosInstance {
  const cookies = parseCookies(ctx);

  const ifood = axios.create({
    baseURL: 'https://merchant-api.ifood.com.br',
    headers: {
      Authorization: `Bearer ${cookies['ifood.token']}`,
    },
  });

  ifood.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      // eslint-disable-next-line no-console
      console.log(error.response);

      if (error.response.status === 401) {
        if (error.response.data.message === 'token expired') {
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            const params = new URLSearchParams();
            params.append('grantType', 'client_credentials');
            params.append('clientId', process.env.IFOOD_CLIENT_ID);
            params.append('clientSecret', process.env.IFOOD_CLIENT_SECRET);

            ifood
              .post('authentication/v1.0/oauth/token', params, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
              .then(response => {
                const { accessToken } = response.data;

                setCookie(ctx, 'ifood.token', accessToken, {
                  maxAge: 23000, // About 6 hours
                  path: '/',
                });

                ifood.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

                failedRequestsQueue.forEach(request =>
                  request.onSuccess(accessToken),
                );
                failedRequestsQueue = [];
              })
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err));
                failedRequestsQueue = [];
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (accessToken: string) => {
                originalConfig.headers.Authorization = `Bearer ${accessToken}`;

                resolve(ifood(originalConfig));
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

  return ifood;
}
