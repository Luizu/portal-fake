import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../services/api';

type Account = {
  name: string;
  avatarUrl: string;
  username: string;
  email: string;
  role: string;
};

type ISignInData = {
  login: string;
  password: string;
};
interface AuthContextData {
  signIn: (credentials: ISignInData) => Promise<void>;
  signOut: () => void;
  updateAccount: () => Promise<void>;
  isAuthenticated: boolean;
  account: Account;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(): void {
  destroyCookie(undefined, 'atw.token');
  destroyCookie(undefined, 'atw.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [loggedAccount, setLoggedAccount] = useState<Account>();
  const isAuthenticated = !!loggedAccount;
  const api = setupAPIClient();

  useEffect(() => {
    try {
      authChannel = new BroadcastChannel('auth');

      authChannel.onmessage = message => {
        switch (message.data) {
          case 'signOut':
            signOut();
            authChannel.close();
            break;
          default:
            break;
        }
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      const { 'atw.token': token } = parseCookies();

      if (token) {
        api
          .get('/me')
          .then(response => {
            const { email, name, role, avatarUrl, username } = response.data;

            setLoggedAccount({ email, name, role, avatarUrl, username });
          }) // eslint-disable-next-line
          .catch(err => {
            signOut();
          });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  async function signIn({ login, password }: ISignInData) {
    try {
      const response = await api.post('session', { login, password });

      const { account, token, refreshToken } = response.data;

      setCookie(undefined, 'atw.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'atw.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setLoggedAccount(account);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      toast.success('Login efetuado com sucesso! 🚀');

      Router.push('/Dashboard');
    } catch (err) {
      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'Account not found':
            toast.error(
              'Conta não existente, verifique suas credenciais e tente novamente',
            );
            break;

          case 'Login/Password not matched':
            toast.error(
              'Erro ao logar! Verifique suas credenciais e tente novamente',
            );
            break;

          default:
            toast.error(
              'Vish, acho que alguem puxou um cabo aqui. Segura ai um pouquinho enquanto resolvo isso e tente novamente em uns minutinhos beleza?',
            );
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }
    }
  }

  async function updateAccount(): Promise<void> {
    try {
      const response = await api.get('/me');

      const { email, name, role, avatarUrl, username } = response.data;

      setLoggedAccount({ email, name, role, avatarUrl, username });
    } catch (err) {
      toast.error('Erro ao atualizar as suas informações');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        updateAccount,
        account: loggedAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
