import { Skeleton } from '@chakra-ui/react';
import CountUp from 'react-countup';
import { useUnitsData } from '../../../services/hooks/useUnitsData';

import {
  Container,
  InfoContainer,
  InfoContent,
  InfoTitle,
  InfoCounter,
  BigIcon,
  SmallIcon,
} from './styles';

export function Session() {
  const { data, isLoading, isFetching, error } = useUnitsData();

  return (
    <>
      {isLoading && isFetching ? (
        <Skeleton startColor="#9e9e9e" endColor="#515151" w="338px" h="456px" />
      ) : error ? (
        <Container>
          <InfoTitle>Erro ao buscar as informações</InfoTitle>
        </Container>
      ) : (
        <Container>
          <InfoContainer>
            <InfoContent>
              <InfoTitle>
                Unidades <br />
                Offline
              </InfoTitle>

              <InfoCounter>
                <CountUp delay={0} end={data.offline} duration={1} />
              </InfoCounter>
            </InfoContent>

            <BigIcon>
              <SmallIcon />
            </BigIcon>
          </InfoContainer>

          <InfoContainer>
            <InfoContent>
              <InfoTitle>
                Unidades <br />
                Online
              </InfoTitle>

              <InfoCounter isOnline>
                <CountUp delay={0} end={data.online} duration={1} />
              </InfoCounter>
            </InfoContent>

            <BigIcon isOnline>
              <SmallIcon isOnline />
            </BigIcon>
          </InfoContainer>
        </Container>
      )}
    </>
  );
}
