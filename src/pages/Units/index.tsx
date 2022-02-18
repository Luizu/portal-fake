import { IoSearch } from 'react-icons/io5';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Skeleton } from '@chakra-ui/react';

import { toast } from 'react-toastify';
import { AppLayout } from '../../layouts/AppLayout';
import { useUnits } from '../../services/hooks/useUnits';
import { withSSRAuth } from '../../utils/withSSRAuth';

import {
  Container,
  Content,
  Header,
  HeaderContent,
  Title,
  CreateButton,
  ContentHeader,
  SearchBox,
  Search,
  Error,
} from '../../../shared/pages/Units.styles';
import { Table } from '../../components/Table';

export default function Units() {
  const { push } = useRouter();

  const [searchedUnits, setSearchedUnits] = useState<string>();

  const { data, isLoading, isFetching, error } = useUnits(1, 100);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === '') {
      setSearchedUnits(undefined);

      return;
    }

    setSearchedUnits(value);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await queryClient.invalidateQueries('unit');
  //     await refetch();
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [take]);

  useEffect(() => {
    toast.info(
      'Dados do Ifood indisponveis devido a indisponibilidade do servidor',
    );
  }, []);

  return (
    <AppLayout page="Unidades">
      <Container>
        <Header>
          <HeaderContent>
            <Title>Unidades</Title>
            <SearchBox>
              <IoSearch size={24} />
              <Search onChange={e => handleSearch(e)} />
            </SearchBox>
          </HeaderContent>
          <CreateButton onClick={() => push('/Units/create')}>
            Nova Unidade
          </CreateButton>
        </Header>

        <Content>
          <ContentHeader>
            {/* <IoRefreshOutline size={24} onClick={() => refetch()} /> */}
          </ContentHeader>

          {isLoading || isFetching ? (
            <>
              <Skeleton
                w="80vw"
                h="55vh"
                startColor="#9e9e9e"
                endColor="#515151"
              />
            </>
          ) : error ? (
            <>
              <Error>
                <Title>Erro ao carregar as unidades</Title>
              </Error>
            </>
          ) : (
            <Table filter={searchedUnits} units={data.units} />
          )}
        </Content>
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
