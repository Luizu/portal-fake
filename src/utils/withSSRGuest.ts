import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    try {
      const cookies = parseCookies(ctx);

      if (cookies['app.token']) {
        return {
          redirect: {
            destination: '/Dashboard',
            permanent: false,
          },
        };
      }

      return fn(ctx);
    } catch (err) {
      console.log(err);
    }
  };
}
