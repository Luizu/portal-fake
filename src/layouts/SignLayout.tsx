import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';
import { Container, Logo, Content } from '../../shared/layouts/SignLayout';

interface ISignLayoutProps {
  children: ReactNode;
}

export function SignLayout({ children }: ISignLayoutProps) {
  const { asPath } = useRouter();

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <Logo
          src="assets/HashtagLogo.webp"
          alt="Logo Hashtag"
          key={`logo-${asPath}`}
          initial={{ opacity: 0, transform: 'translateX(-80px)' }}
          animate={{
            opacity: 1,
            transform: 'translateX(0px)',
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transform: 'translateX(-80px)',
            transition: {
              duration: 1,
            },
          }}
        />
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        <Content
          key={`form-${asPath}`}
          initial={{ opacity: 0, transform: 'translateX(80px)' }}
          animate={{
            opacity: 1,
            transform: 'translateX(0px)',
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transform: 'translateX(80px)',
            transition: {
              duration: 1,
            },
          }}
        >
          {children}
        </Content>
      </AnimatePresence>
    </Container>
  );
}
