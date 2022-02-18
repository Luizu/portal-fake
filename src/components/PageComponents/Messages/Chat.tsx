import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoRefreshOutline, IoTrashOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useWindowWidth } from '@react-hook/window-size';
import { MessagesSkeleton } from './MessagesSkeleton';
import { Pagination } from '../../Pagination';

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
} from '../../../../shared/pages/Messages/Messages.styles';
import { setupAPIClient } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';
import { useChat } from '../../../services/hooks/useChat';

export function Chat() {
  const width = useWindowWidth();
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(4);
  const [selected, setSelected] = useState([]);

  const api = setupAPIClient();

  const { data, isLoading, isFetching, error, refetch } = useChat(page, take);

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
      await queryClient.invalidateQueries('chat');
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
      await api.delete(`/chat`, {
        data: { ids: selected },
      });

      setSelected([]);
      await queryClient.invalidateQueries('chat');
      await refetch();

      toast.success('Fluxos excluídos com sucesso!');
    } catch (err) {
      toast.error(
        'Opa, você achou uma funcionalidade ainda não liberada, é só aguarar que em breve liberaremos!',
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/chat/${id}`);
      await queryClient.invalidateQueries('chat');
      await refetch();

      toast.success('Fluxos excluídos com sucesso!');
    } catch (err) {
      toast.error(
        'Ops! Algo de errado aconteceu ao deletar esse fluxo :/, por favor, tente novamente',
      );
    }
  };

  return (
    <List>
      <ListHeader>
        <ListTitle>Fluxos</ListTitle>

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
      ) : data.chats.length === 0 ? (
        <Error>
          <ErrorText>Nenhuma mensagem encontrada no sistema!</ErrorText>
        </Error>
      ) : (
        <>
          <ListBox>
            {data.chats.map(chat => (
              <ListItem key={chat.id}>
                <ItemCheckbox
                  type="checkbox"
                  checked={selected.includes(chat.id)}
                  onChange={() => handleCheckChange(chat.id)}
                />
                <Link href={`/Messages/editChat?id=${chat.id}`} passHref>
                  <ItemContent>
                    <ItemTitle>
                      {chat.name.length > 20 && width < 1440
                        ? `${chat.name.slice(0, 20)}...`
                        : chat.name.length > 35 && width > 1440
                        ? `${chat.name.slice(0, 35)}...`
                        : chat.name}
                    </ItemTitle>
                    <ItemText>{`${chat.messages.length} mensagens`}</ItemText>
                  </ItemContent>
                </Link>
                <IoTrashOutline
                  size={24}
                  onClick={() => {
                    handleDelete(chat.id);
                  }}
                />
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
