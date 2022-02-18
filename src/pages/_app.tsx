import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; // nprogress module
import 'nprogress/nprogress.css'; // styles of nprogress
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { globalStyles } from '../../shared/styles';
import { AuthProvider } from '../contexts/AuthContext';
import { queryClient } from '../services/queryClient';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ToastContainer autoClose={5000} />
      <AuthProvider>
        <ChakraProvider>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={asPath}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            >
              {globalStyles}
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
