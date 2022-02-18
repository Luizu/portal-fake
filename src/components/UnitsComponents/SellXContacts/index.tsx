import { IoCart, IoMan } from 'react-icons/io5';
import { useUnit } from '../../../services/hooks/useUnit';

import { Container, Title, Content, Info, InfoText } from './styles';

interface SellProps {
  id: string;
}

export function SellXContacts({ id }: SellProps) {
  const { data } = useUnit(id);

  return (
    <Container>
      <Title>Vendas x Contatos</Title>

      <Content>
        <Info>
          <IoCart size={24} />
          <InfoText>{data?.unit.contacts.length}</InfoText>
        </Info>

        <Info>
          <IoMan size={24} />
          <InfoText>{data?.unit.orders.length}</InfoText>
        </Info>
      </Content>
    </Container>
  );
}
