import { useQuery } from 'react-query';
import { setupAPIClient } from '../api';

interface GetUnitsDataResponse {
  incomingContacts: number;
  orders: number;
  totalUnits: number;
  savedContacts: number;
  online: number;
  offline: number;
}

const api = setupAPIClient();

export async function getUnitsData(): Promise<GetUnitsDataResponse> {
  const { data } = await api.get(`unit/data`);

  return {
    incomingContacts: data.incomingContacts,
    orders: data.orders,
    totalUnits: data.totalUnits,
    savedContacts: data.savedContacts,
    online: data.online,
    offline: data.offline,
  };
}

export function useUnitsData() {
  return useQuery(['unitData'], () => getUnitsData(), {
    staleTime: 60000, // 1 minute
  });
}
