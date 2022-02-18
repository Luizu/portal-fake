import { useEffect, useState } from 'react';
import { useUnit } from '../../../services/hooks/useUnit';
import { Container, Title, Content, Text } from './styles';

interface IConvertedProps {
  id: string;
}

export function ConvertedContacts({ id }: IConvertedProps) {
  const { data } = useUnit(id);
  const [convertion, setConvertion] = useState(0);

  useEffect(() => {
    if (data) {
      if (data.unit.orders.length <= 0 && data.unit.contacts.length <= 0) {
        setConvertion(0);
        return;
      }

      setConvertion(
        Math.floor((data.unit.orders.length * 100) / data.unit.contacts.length),
      );
    }
  }, [data]);

  return (
    <Container>
      <Title>Contatos Convertidos</Title>

      <Content>
        <Text>{convertion}%</Text>
      </Content>
    </Container>
  );
}
