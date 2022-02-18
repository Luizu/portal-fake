import { Skeleton } from '@chakra-ui/react';
import { IoPeople } from 'react-icons/io5';
import CountUp from 'react-countup';

import { useUnitsData } from '../../../services/hooks/useUnitsData';
import { Container, Title, Content, Info } from './styles';

export function IncomingContacts() {
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
          <IoPeople size={40} color="#FFC107" />

          <Content>
            <Info>
              <CountUp delay={0} end={data.incomingContacts} duration={1.5} />
            </Info>
            <Title>Contatos Recebidos</Title>
          </Content>
        </Container>
      )}
    </>
  );
}
