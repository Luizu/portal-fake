import { Skeleton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useUnitsData } from '../../../services/hooks/useUnitsData';
import { Container, Title, Info } from './styles';

export function SalesConvertion() {
  const [convertion, setConvertion] = useState(0);
  const { data, isLoading, isFetching, error } = useUnitsData();

  useEffect(() => {
    if (data) {
      setConvertion(Math.floor((data.orders * 100) / data.incomingContacts));
    }
  }, [data]);

  return (
    <>
      {isLoading && isFetching ? (
        <Skeleton startColor="#9e9e9e" endColor="#515151" w="338px" h="195px" />
      ) : error ? (
        <Container>
          <Title>Erro ao buscar as informações</Title>
        </Container>
      ) : (
        <Container>
          <Title>
            Conversão <br /> em Vendas
          </Title>

          <Info>
            <CountUp delay={0} end={convertion} duration={2} /> %
          </Info>
        </Container>
      )}
    </>
  );
}
