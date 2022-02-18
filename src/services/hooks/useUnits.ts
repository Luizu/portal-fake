import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../api';

type IContact = {
  id: string;
  number: string;
  origin: string;
};

type IOrders = {
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
  email: string;
  phone: string;
  CNPJ: string;
  yoogaUrl: string;
  activationsInDayAmount: number;
  activationCyclesAmount: number;
  contactsAmount: number;
  n1MerchantId: string;
  gringoMerchantId: string;
  juliusMerchantId: string;
  fernandoMerchantId: string;
  arrozMerchantId: string;
  umayaMerchantId: string;
  contacts: IContact[];
  organic: IContact[];
  campaign: IContact[];
  orders: IOrders[];
  reviewScoreNF: number;
  reviewScoreGU: number;
  reviewScoreJA: number;
  statusIfoodNF: boolean;
  averageTicketNF: number;
  revenuesNF: number;
  totalSalesNF: number;
  statusIfoodGU: boolean;
  averageTicketGU: number;
  revenuesGU: number;
  totalSalesGU: number;
  statusIfoodJA: boolean;
  averageTicketJA: number;
  revenuesJA: number;
  totalSalesJA: number;
};

type GetUnitsResponse = {
  units: IUnit[];
  totalCount: number;
};

const api = setupAPIClient();

export async function getUnits(
  offset: number,
  take: number,
): Promise<GetUnitsResponse> {
  const { data } = await api.get(`unit/?offset=${offset}&take=${take}`);

  let reviewScoreNF: number;
  let statusIfoodNF: boolean;
  let averageTicketNF: string;
  let revenuesNF: string;
  let totalSalesNF: number;

  let reviewScoreGU: number;
  let statusIfoodGU: boolean;
  let averageTicketGU: string;
  let revenuesGU: string;
  let totalSalesGU: number;

  let reviewScoreJA: number;
  let statusIfoodJA: boolean;
  let averageTicketJA: string;
  let revenuesJA: string;
  let totalSalesJA: number;

  const units = await Promise.all(
    data.units.map(async (unit: IUnit) => {
      if (unit.n1MerchantId || unit.fernandoMerchantId) {
        try {
          const response = await api.get(
            `ifood/${
              unit.trio === 'NGJ' ? unit.n1MerchantId : unit.fernandoMerchantId
            }`,
          );

          reviewScoreNF = response.data.merchant.review.reviewScore;
          statusIfoodNF = response.data.merchant.session.available;

          averageTicketNF = `R$ ${response.data.merchant.sales.averageTicket}`;
          revenuesNF = `R$ ${response.data.merchant.sales.revenues}`;
          totalSalesNF = response.data.merchant.sales.totalSales;
        } catch (err) {
          console.log(err);

          reviewScoreNF = 0;
          statusIfoodNF = false;
          averageTicketNF = 'R$ 0,00';
          revenuesNF = 'R$ 0,00';
          totalSalesNF = 0;
        }
      }

      if (unit.gringoMerchantId || unit.umayaMerchantId) {
        try {
          const response = await api.get(
            `ifood/${
              unit.trio === 'NGJ' ? unit.gringoMerchantId : unit.umayaMerchantId
            }`,
          );

          reviewScoreGU = response.data.merchant.review.reviewScore;
          statusIfoodGU = response.data.merchant.session.available;
          averageTicketGU = `R$ ${response.data.merchant.sales.averageTicket}`;
          revenuesGU = `R$ ${response.data.merchant.sales.revenues}`;
          totalSalesGU = response.data.merchant.sales.totalSales;
        } catch (err) {
          console.log(err);

          reviewScoreGU = 0;
          statusIfoodGU = false;
          averageTicketGU = 'R$ 0,00';
          revenuesGU = 'R$ 0,00';
          totalSalesGU = 0;
        }
      }

      if (unit.juliusMerchantId || unit.arrozMerchantId) {
        try {
          const response = await api.get(
            `ifood/${
              unit.trio === 'NGJ' ? unit.juliusMerchantId : unit.arrozMerchantId
            }`,
          );

          reviewScoreJA = response.data.merchant.review.reviewScore;
          statusIfoodJA = response.data.merchant.session.available;
          averageTicketJA = `R$ ${response.data.merchant.sales.averageTicket}`;
          revenuesJA = `R$ ${response.data.merchant.sales.revenues}`;
          totalSalesJA = response.data.merchant.sales.totalSales;
        } catch (err) {
          console.log(err);

          reviewScoreJA = 0;
          statusIfoodJA = false;
          averageTicketJA = 'R$ 0,00';
          revenuesJA = 'R$ 0,00';
          totalSalesJA = 0;
        }
      }

      const date = unit.lastContactsGeneratedDate
        ? new Date(unit.lastContactsGeneratedDate)
        : null;

      const lastSeenDate = unit.lastSeen ? new Date(unit.lastSeen) : null;

      const formattedLastContactsGeneratedDate = unit.lastContactsGeneratedDate
        ? `${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}/${
            date.getMonth() + 1 >= 10
              ? date.getMonth() + 1
              : `0${date.getMonth() + 1}`
          }/${date.getFullYear()}`
        : null;

      const formattedLastSeen = unit.lastSeen
        ? `${
            lastSeenDate.getDate() >= 10
              ? lastSeenDate.getDate()
              : `0${lastSeenDate.getDate()}`
          }/${
            lastSeenDate.getMonth() + 1 >= 10
              ? lastSeenDate.getMonth() + 1
              : `0${lastSeenDate.getMonth() + 1}`
          }/${lastSeenDate.getFullYear()} ás ${
            lastSeenDate.getHours() >= 10
              ? lastSeenDate.getHours()
              : `0${lastSeenDate.getHours()}`
          }:${
            lastSeenDate.getMinutes() >= 10
              ? lastSeenDate.getMinutes()
              : `0${lastSeenDate.getMinutes()}`
          }`
        : null;

      const formattedLastActivationDate = unit.lastActivationDate
        ? `${
            new Date(unit.lastActivationDate).getDate() >= 10
              ? new Date(unit.lastActivationDate).getDate()
              : `0${new Date(unit.lastActivationDate).getDate()}`
          }/${
            new Date(unit.lastActivationDate).getMonth() + 1 >= 10
              ? new Date(unit.lastActivationDate).getMonth() + 1
              : `0${new Date(unit.lastActivationDate).getMonth() + 1}`
          }/${new Date(unit.lastActivationDate).getFullYear()}`
        : null;

      return {
        id: unit.id,
        name: unit.name,
        trio: unit.trio,
        email: unit.email,
        isOnline: unit.isOnline,
        lastSeen: formattedLastSeen,
        phone: unit.phone,
        CNPJ: unit.CNPJ,
        lastActivationDate: formattedLastActivationDate,
        lastContactsGeneratedDate: formattedLastContactsGeneratedDate,
        activationsInDayAmount: unit.activationsInDayAmount,
        activationCyclesAmount: unit.activationCyclesAmount,
        contactsAmount: unit.contactsAmount,
        reviewScoreNF,
        reviewScoreGU,
        reviewScoreJA,
        statusIfoodNF,
        averageTicketNF,
        revenuesNF,
        totalSalesNF,
        statusIfoodGU,
        averageTicketGU,
        revenuesGU,
        totalSalesGU,
        statusIfoodJA,
        averageTicketJA,
        revenuesJA,
        totalSalesJA,
        yoogaUrl: unit.yoogaUrl,
        contacts: unit.contacts,
        organic: unit.contacts.filter(contact => contact.origin === 'organic'),
        campaign: unit.contacts.filter(
          contact => contact.origin === 'campaign',
        ),
        orders: unit.orders,
      };
    }),
  );

  return {
    units,
    totalCount: data.count,
  };
}

export function useUnits(offset: number, take: number) {
  return useQuery(['unit', offset], () => getUnits(offset, take), {
    staleTime: 60000, // 1 minute
  });
}
