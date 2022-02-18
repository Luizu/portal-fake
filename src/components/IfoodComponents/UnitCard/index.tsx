import { Container, Title, Content, Info, TitleBox, Session } from './styles';

export function UnitCard() {
  return (
    <Container>
      <Content>
        <TitleBox>
          <Title>FUA - Aracaju</Title>
          <Session>Online</Session>
        </TitleBox>
        <Info>
          Vendas: <strong>0</strong>
        </Info>

        <Info>
          Nota: <strong>0</strong>
        </Info>

        <Info>
          Total Pedidos: <strong>0</strong>
        </Info>
      </Content>
    </Container>
  );
}
