import React, { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import { IoPeople, IoPerson, IoBagHandle, IoReader } from 'react-icons/io5';

import {
  Container,
  Title,
  Content,
  Info,
  InfoText,
  VerticalBox,
  HoverInfo,
} from './styles';
import { setupAPIClient } from '../../../services/api';

type IContact = {
  organic: number;
  campaign: number;
  paper: number;
  total: number;
};

interface IReceivedContactsProps {
  unitId: string;
}

export function ReceivedContacts({ unitId }: IReceivedContactsProps) {
  const [contacts, setContacts] = useState<IContact>();
  const api = setupAPIClient();

  useEffect(() => {
    api.get(`/unit/data/${unitId}`).then(response => {
      setContacts(response.data.contacts);
    });
  }, [unitId]);

  return (
    <>
      {contacts ? (
        <Container>
          <Title>Contatos Recebidos</Title>

          <Content>
            <VerticalBox>
              <Info>
                <HoverInfo title="Contatos Orgânicos">
                  <IoPerson size={24} />
                </HoverInfo>
                <InfoText>{contacts.organic}</InfoText>
              </Info>
              <Info>
                <HoverInfo title="Contatos de Panfleto">
                  <IoReader size={24} />
                </HoverInfo>
                <InfoText>{contacts.paper}</InfoText>
              </Info>
            </VerticalBox>
            <VerticalBox>
              <Info>
                <HoverInfo title="Contatos de Campanha">
                  <IoBagHandle size={24} />
                </HoverInfo>
                <InfoText>{contacts.campaign}</InfoText>
              </Info>

              <Info>
                <HoverInfo title="Total de Contatos">
                  <IoPeople size={24} />
                </HoverInfo>
                <InfoText>{contacts.total}</InfoText>
              </Info>
            </VerticalBox>
          </Content>
        </Container>
      ) : (
        <Skeleton w="300px" h="134px" startColor="#9e9e9e" endColor="#515151" />
      )}
    </>
  );
}
