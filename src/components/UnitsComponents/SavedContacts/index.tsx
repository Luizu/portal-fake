import { IoBookmark, IoSyncCircle } from 'react-icons/io5';
import { useUnit } from '../../../services/hooks/useUnit';

import { Container, Title, Content, Info, InfoText } from './styles';

interface ISavedContactsProps {
  id: string;
}

export function SavedContacts({ id }: ISavedContactsProps) {
  const { data } = useUnit(id);

  return (
    <Container>
      <Title>Contatos Salvos</Title>

      <Content>
        <Info>
          <IoBookmark size={24} />
          <InfoText>{data?.unit.contacts.length}</InfoText>
        </Info>

        <Info>
          <IoSyncCircle size={24} />
          <InfoText>{data?.unit.activationCyclesAmount}</InfoText>
        </Info>
      </Content>
    </Container>
  );
}
