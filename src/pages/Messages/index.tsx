import React, { useState } from 'react';
import Link from 'next/link';

import { AppLayout } from '../../layouts/AppLayout';
import { ActivationMessages } from '../../components/PageComponents/Messages/ActivationMessages';
import { Chat } from '../../components/PageComponents/Messages/Chat';

import { withSSRAuth } from '../../utils/withSSRAuth';

import {
  Container,
  Main,
  Header,
  ContentPart,
  Tab,
  Tabs,
  Title,
  Button,
} from '../../../shared/pages/Messages/Messages.styles';

export default function Messages() {
  const [isActive, setIsActive] = useState(false);

  return (
    <AppLayout page={`Mensagens de ${isActive ? 'Fluxo' : 'Ativação'}`}>
      <Container>
        <Main>
          <Header>
            <ContentPart>
              <Title>Mensagens</Title>

              <Tabs>
                <Tab isActive={!isActive} onClick={() => setIsActive(false)}>
                  Ativação
                </Tab>
                <Tab isActive={isActive} onClick={() => setIsActive(true)}>
                  Fluxo
                </Tab>
              </Tabs>
            </ContentPart>

            {isActive ? (
              <Link href="/Messages/editChat">
                <Button>Criar Novo Fluxo</Button>
              </Link>
            ) : (
              <Link href="/Messages/newActivation">
                <Button>Criar Nova Ativação</Button>
              </Link>
            )}
          </Header>

          {isActive ? <Chat /> : <ActivationMessages />}
        </Main>
      </Container>
    </AppLayout>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
