import { Skeleton } from '@chakra-ui/react';
import CountUp from 'react-countup';

import { useUnitsData } from '../../../services/hooks/useUnitsData';
import { Container, Title, Info } from './styles';

export function TotalStores() {
  const { data, isLoading, isFetching, error } = useUnitsData();

  return (
    <>
      {isLoading && isFetching ? (
        <Skeleton startColor="#9e9e9e" endColor="#515151" w="338px" h="98px" />
      ) : error ? (
        <Container>
          <Title>Erro ao buscar as informações</Title>
        </Container>
      ) : (
        <Container>
          <Title>
            Número <br /> de Lojas
          </Title>
          <Info>
            <CountUp
              delay={0}
              end={data.totalUnits}
              duration={data.totalUnits <= 50 ? 1 : 3}
            />
          </Info>
        </Container>
      )}
    </>
  );
}
