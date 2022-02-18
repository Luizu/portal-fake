import { useQuery } from 'react-query';
import { setupAPIClient } from '../api';

type ITag = {
  id: string;
  name: string;
  internId: string;
};

type GetTagsResponse = {
  tags: ITag[];
  totalCount: number;
};

const api = setupAPIClient();

export async function getTags(
  offset: number,
  take: number,
): Promise<GetTagsResponse> {
  const { data } = await api.get(`tag/?offset=${offset}&take=${take}`);

  const tags = data.tags.map(tag => {
    return {
      id: tag.id,
      name: tag.name,
      internId: tag.internId,
    };
  });

  return {
    tags,
    totalCount: data.count,
  };
}

export function useTags(offset: number, take: number) {
  return useQuery(['tag', offset], () => getTags(offset, take), {
    staleTime: 60000, // 1 minute
  });
}
