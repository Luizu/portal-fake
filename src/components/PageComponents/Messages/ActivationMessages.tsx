import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoRefreshOutline, IoTrashOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useWindowWidth } from '@react-hook/window-size';

// Api
import { setupAPIClient } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';
// Compoments
import { MessagesSkeleton } from './MessagesSkeleton';
import { Pagination } from '../../Pagination';
import { useActivation } from '../../../services/hooks/useActivation';
import {
  ListHeader,
  ListTitle,
  ListBox,
  List,
  ListItem,
  ItemCheckbox,
  ItemContent,
  ItemTitle,
  ItemText,
  IconsBox,
  ErrorText,
  Error,
  IconBox,
} from '../../../../shared/pages/Messages/Messages.styles';

export function ActivationMessages() {
  const width = useWindowWidth();
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(4);
  const [selected, setSelected] = useState([]);

  const api = setupAPIClient();

  const { data, isLoading, isFetching, error, refetch } = useActivation(
    page,
    take,
  );

  useEffect(() => {
    (async () => {
      if (width < 1440) {
        setTake(4);
      } else {
        setTake(9);
      }
    })();
  }, [width]);

  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries('activation');
      await refetch();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take]);

  const handleCheckChange = (id: string) => {
    const checkIfIdIsSelected = selected.find(item => item === id);

    if (checkIfIdIsSelected) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleMassDelete = async () => {
    try {
      await api.delete(`/activationMessage`, {
        data: { ids: selected },
      });

      setSelected([]);
      await queryClient.invalidateQueries('activation');
      await refetch();

      toast.success('Mensagens excluídas com sucesso!');
    } catch (err) {
      toast.error('Ops! Algo de errado aconteceu, por favor, tente novamente');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/activationMessage/${id}`);
      await queryClient.invalidateQueries('activation');
      await refetch();

      toast.success('Mensagem excluída com sucesso!');
    } catch (err) {
      toast.error(
        'Ops! Algo de errado aconteceu ao deletar essa mensagem :/, por favor, tente novamente',
      );
    }
  };

  return (
    <List>
      <ListHeader>
        <ListTitle>Ativação</ListTitle>

        <IconsBox>
          <IoRefreshOutline size={24} onClick={() => refetch()} />
          {selected.length !== 0 && (
            <IoTrashOutline
              size={24}
              className="bin"
              onClick={handleMassDelete}
            />
          )}
        </IconsBox>
      </ListHeader>

      {isLoading || isFetching ? (
        <ListBox>
          <MessagesSkeleton repeats={take} />
        </ListBox>
      ) : error ? (
        <Error>
          <ErrorText>
            Ops! Algo de errado aconteceu, por favor, tente novamente
          </ErrorText>
        </Error>
      ) : data.activationMessages.length === 0 ? (
        <Error>
          <ErrorText>Nenhuma mensagem encontrada no sistema!</ErrorText>
        </Error>
      ) : (
        <>
          <ListBox>
            {data.activationMessages.map(message => (
              <ListItem key={message.id}>
                <ItemCheckbox
                  type="checkbox"
                  checked={selected.includes(message.id)}
                  onChange={() => handleCheckChange(message.id)}
                />
                <Link href={`/Messages/editMessage?id=${message.id}`} passHref>
                  <ItemContent>
                    <ItemTitle>
                      {message.title.length > 20 && width < 1440
                        ? `${message.title.slice(0, 20)} ...`
                        : message.title.length > 30 && width > 1440
                        ? `${message.title.slice(0, 30)} ...`
                        : message.title}
                    </ItemTitle>
                    <ItemText>
                      {message.body.length > 40 && width < 1440
                        ? `${message.body.slice(0, 40)} ...`
                        : message.body.length > 90 && width > 1440
                        ? `${message.body.slice(0, 90)} ...`
                        : message.body}
                    </ItemText>
                  </ItemContent>
                </Link>

                <IconBox>
                  <IoTrashOutline
                    size={24}
                    onClick={() => {
                      handleDelete(message.id);
                    }}
                  />
                </IconBox>
              </ListItem>
            ))}
          </ListBox>
          <Pagination
            totalCountOfRegisters={data.totalCount}
            registerPerPage={take}
            onPageChange={setPage}
            currentPage={page}
          />
        </>
      )}
    </List>
  );
}
