import { useQuery } from 'react-query';
import { setupAPIClient } from '../api';

type IContact = {
  id: string;
  number: string;
  origin: string;
};

type IOrder = {
  id: string;
};

type IUnit = {
  id: string;
  name: string;
  trio: string;
  isOnline: boolean;
  lastSeen: string;
  lastActivationDate: string;
  lastContactsGeneratedDate: string;
  activationCyclesAmount: number;
  email: string;
  phone: string;
  CNPJ: string;
  yoogaUrl: string;
  contacts: IContact[];
  organic: IContact[];
  campaign: IContact[];
  orders: IOrder[];
};

type GetUnitResponse = {
  unit: IUnit;
};

const api = setupAPIClient();

export async function getUnit(id: string): Promise<GetUnitResponse> {
  const { data } = await api.get(`unit/${id}`);

  return {
    unit: data,
  };
}

export function useUnit(id: string) {
  return useQuery(['unit', id], () => getUnit(id), {
    staleTime: 1200000, // 2 minute
  });
}
