import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AccountCentral } from './AccountCentral';
import { Container, Content, Welcoming, WelcomingText } from './styles';

export function Header() {
  const { account } = useContext(AuthContext);

  return (
    <Container>
      <Content>
        <Welcoming>
          <WelcomingText>
            Olá {account?.username ? account.username : account?.name}, <br />
            <strong>Bem Vindo!</strong>
          </WelcomingText>
        </Welcoming>

        <AccountCentral />
      </Content>
    </Container>
  );
}
