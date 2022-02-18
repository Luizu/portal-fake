import { IoPeople } from 'react-icons/io5';
import CountUp from 'react-countup';

import { Container, Title, Content, Info } from './styles';

export function SoldUnits() {
  return (
    <Container>
      <IoPeople size={40} color="#FFC107" />

      <Content>
        <Info>
          + <CountUp delay={0} end={400} duration={5} />
        </Info>
        <Title>Unidades Vendidas</Title>
      </Content>
    </Container>
  );
}
