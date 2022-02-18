import { useQuery } from 'react-query';
import { setupAPIClient } from '../api';

type IActivationMessage = {
  id: string;
  title: string;
  body: string;
};

type GetActivationResponse = {
  activationMessages: IActivationMessage[];
  totalCount: number;
};

const api = setupAPIClient();

export async function getActivations(
  offset: number,
  take: number,
): Promise<GetActivationResponse> {
  const { data } = await api.get(
    `activationMessage/?offset=${offset}&take=${take}`,
  );

  const activationMessages = data.activationMessages.map(am => {
    return {
      id: am.id,
      title: am.title,
      body: am.body,
    };
  });

  return {
    activationMessages,
    totalCount: data.count,
  };
}

export function useActivation(offset: number, take: number) {
  return useQuery(['activation', offset], () => getActivations(offset, take), {
    staleTime: 60000, // 1 minute
  });
}
