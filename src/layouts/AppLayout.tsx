import { ReactNode } from 'react';
import Head from 'next/head';
import { Sidebar } from '../components/Sidebar';
import { Container, Main, Content } from '../../shared/layouts/AppLayout';
import { Header } from '../components/Header';

interface IAppLayoutProps {
  children: ReactNode;
  page?: string;
}

export function AppLayout({ children, page }: IAppLayoutProps) {
  return (
    <>
      <Head>
        <title>Portal | {page}</title>
      </Head>
      <Container>
        <Sidebar />

        <Main>
          <Header />
          <Content>{children}</Content>
        </Main>
      </Container>
    </>
  );
}
