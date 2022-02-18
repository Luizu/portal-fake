import { useQuery } from 'react-query';
import { setupAPIClient } from '../api';

type IChat = {
  id: string;
  name: string;
  messages: [];
};

type GetChatResponse = {
  chats: IChat[];
  totalCount: number;
};

const api = setupAPIClient();

export async function getChats(
  offset: number,
  take: number,
): Promise<GetChatResponse> {
  const { data } = await api.get(`chat/?offset=${offset}&take=${take}`);

  const chats = data.chats.map(chat => {
    return {
      id: chat.id,
      name: chat.name,
      messages: chat.messages,
    };
  });

  return {
    chats,
    totalCount: data.count,
  };
}

export function useChat(offset: number, take: number) {
  return useQuery(['chat', offset], () => getChats(offset, take), {
    staleTime: 60000, // 1 minute
  });
}
