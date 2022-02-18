import { useQuery } from 'react-query';
import { setupIfoodClient } from '../ifood';

interface GetMerchantResponse {
  session: SessionResponse;
}

type SessionResponse = {
  session: 'Online' | 'Closed';
  reason?: string;
};

const api = setupIfoodClient();

async function getSession(merchantId: string): Promise<SessionResponse> {
  const { data } = await api.get(
    `merchant/v1.0/merchants/${merchantId}/status`,
  );

  if (data[0].state === 'CLOSED') {
    return {
      session: 'Closed',
      reason: data[0].message.subtitle,
    };
  }

  return {
    session: 'Online',
  };
}

export async function getMerchantData(
  merchantId: string,
): Promise<GetMerchantResponse> {
  const session = await getSession(merchantId);

  return {
    session,
  };
}

export function useMerchants(merchantId: string) {
  return useQuery(['merchant', merchantId], () => getMerchantData(merchantId), {
    staleTime: 60000, // 1 minute
  });
}
