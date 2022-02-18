import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useGlobalFilter,
  useSortBy,
} from 'react-table';
import { AiOutlineSync } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import {
  Container,
  Content,
  Head,
  Body,
  Row,
  HeaderContent,
  BodyContent,
  MainContent,
  Status,
  Button,
  BodyBox,
  Headerow,
  Btn,
} from './styles';

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
  activationsInDayAmount: number;
  activationCyclesAmount: number;
  n1MerchantId: string;
  gringoMerchantId: string;
  juliusMerchantId: string;
  fernandoMerchantId: string;
  arrozMerchantId: string;
  umayaMerchantId: string;
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
  contactsAmount: number;
  contacts: IContact[];
  organic: IContact[];
  campaign: IContact[];
  orders: IOrders[];
};

interface TableProps {
  filter: string;
  units: IUnit[];
}

export function Table({ filter, units }: TableProps) {
  const { push } = useRouter();

  const columns = useMemo(
    () => [
      {
        Header: 'UNIDADE',
        accessor: 'name',
      },
      {
        Header: 'TRIO',
        accessor: 'trio',
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        width: 80,
        disableSortBy: true,
      },
      {
        Header: 'ONLINE DESDE / VISTO POR ULTIMO',
        accessor: 'lastSeen',
        disableSortBy: true,
      },
      {
        Header: 'ÚLTIMA RECARGA DOS CONTATOS',
        accessor: 'lastContactsGeneratedDate',
        disableSortBy: true,
      },
      {
        Header: 'CONTATOS ATENDIDOS PELO BOT',
        accessor: 'contacts',
      },
      {
        Header: 'CONTATOS SINCRONIZADOS',
        accessor: 'contactsAmount',
      },
      {
        Header: 'ATIVAÇÕES NO DIA',
        accessor: 'activationsInDayAmount',
      },
      {
        Header: 'CICLOS DE ATIVAÇÕES RESTANTES',
        accessor: 'activationCyclesAmount',
      },
      {
        Header: 'DATA DA ÚLTIMA ATIVAÇÃO',
        accessor: 'lastActivationDate',
        disableSortBy: true,
      },
      {
        Header: 'PEDIDOS NO YOOGA',
        accessor: 'orders',
      },
      {
        Header: 'STATUS NO IFOOD N1 / FERNANDO',
        accessor: 'statusIfoodNF',
        disableSortBy: true,
      },
      {
        Header: 'STATUS NO IFOOD GRINGO / UMAYA',
        accessor: 'statusIfoodGU',
        disableSortBy: true,
      },
      {
        Header: 'STATUS NO IFOOD JULIUS / ARROZ',
        accessor: 'statusIfoodJA',
        disableSortBy: true,
      },
      {
        Header: 'TICKET MÉDIO NO IFOOD N1 / FERNANDO',
        accessor: 'averageTicketNF',
      },
      {
        Header: 'TICKET MÉDIO NO IFOOD GRINGO / UMAYA',
        accessor: 'averageTicketGU',
      },
      {
        Header: 'TICKET MÉDIO NO IFOOD JULIUS / ARROZ',
        accessor: 'averageTicketJA',
      },
      {
        Header: 'RECEITA NO IFOOD N1 / FERNANDO',
        accessor: 'revenuesNF',
      },
      {
        Header: 'RECEITA NO IFOOD GRINGO / UMAYA',
        accessor: 'revenuesGU',
      },
      {
        Header: 'RECEITA NO IFOOD JULIUS / ARROZ',
        accessor: 'revenuesJA',
      },
      {
        Header: 'TOTAL DE VENDAS NO IFOOD N1 / FERNANDO',
        accessor: 'totalSalesNF',
      },
      {
        Header: 'TOTAL DE VENDAS NO IFOOD GRINGO / UMAYA',
        accessor: 'totalSalesGU',
      },
      {
        Header: 'TOTAL DE VENDAS NO IFOOD JULIUS / ARROZ',
        accessor: 'totalSalesJA',
      },
      {
        Header: 'NOTA NO IFOOD N1 / FERNANDO',
        accessor: 'reviewScoreNF',
      },
      {
        Header: 'NOTA NO IFOOD GRINGO / UMAYA',
        accessor: 'reviewScoreGU',
      },
      {
        Header: 'NOTA NO IFOOD JULIUS / ARROZ',
        accessor: 'reviewScoreJA',
      },

      {
        Header: 'ID',
        accessor: 'id',
      },
    ],

    [],
  );

  const data = useMemo(() => {
    const filteredData = units.map((u: IUnit) => {
      const unit = {
        id: u.id,
        trio: u.trio,
        name: u.name,
        status: <Status isOnline={u.isOnline} />,
        lastSeen: u.lastSeen || 'Nunca Utilizou',
        lastContactsGeneratedDate:
          u.lastContactsGeneratedDate || 'Nunca Realizado',
        contacts: u.contacts.length,
        contactsAmount: u.contactsAmount,
        activationsInDayAmount: u.activationsInDayAmount,
        activationCyclesAmount: u.activationCyclesAmount,
        reviewScoreNF: u.reviewScoreNF,
        reviewScoreGU: u.reviewScoreGU,
        reviewScoreJA: u.reviewScoreJA,
        statusIfoodNF: <Status isOnline={u.statusIfoodNF} />,
        averageTicketNF: u.averageTicketNF,
        revenuesNF: u.revenuesNF,
        totalSalesNF: u.totalSalesNF,
        statusIfoodGU: <Status isOnline={u.statusIfoodGU} />,
        averageTicketGU: u.averageTicketGU,
        revenuesGU: u.revenuesGU,
        totalSalesGU: u.totalSalesGU,
        statusIfoodJA: <Status isOnline={u.statusIfoodJA} />,
        averageTicketJA: u.averageTicketJA,
        revenuesJA: u.revenuesJA,
        totalSalesJA: u.totalSalesJA,
        lastActivationDate: u.lastActivationDate || 'Nunca Realizado',
        orders: u.orders.length,
      };

      return unit;
    });

    return filteredData;
  }, [units]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      width: 200,
      maxWidth: 300,
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    resetResizing,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: ['id'], // use property option, in columns define id name "id"
      },
    },
    useGlobalFilter,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
  );
  useEffect(() => {
    setGlobalFilter(filter);
  }, [filter]);

  return (
    <>
      <Btn>
        <Button type="button" onClick={resetResizing}>
          <AiOutlineSync />
        </Button>
      </Btn>
      <Container>
        <MainContent>
          <Content {...getTableProps()} className="table">
            <HeaderContent>
              {headerGroups.map(headerGroup => (
                <Headerow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <Head
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaChevronDown
                              style={{ position: 'absolute', top: '3' }}
                            />
                          ) : (
                            <FaChevronUp
                              style={{ position: 'absolute', top: '3' }}
                            />
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    </Head>
                  ))}
                </Headerow>
              ))}
            </HeaderContent>

            <BodyBox>
              <BodyContent {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <Row
                      {...row.getRowProps()}
                      onClick={() => push(`Units/${row.original.id}`)}
                    >
                      {row.cells.map(cell => {
                        return (
                          <Body {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </Body>
                        );
                      })}
                    </Row>
                  );
                })}
              </BodyContent>
            </BodyBox>
          </Content>
        </MainContent>
      </Container>
    </>
  );
}
