import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import { IoRibbon, IoPerson, IoPersonAdd } from 'react-icons/io5';

import {
  Container,
  Content,
  Header,
  Profile,
  ProfileText,
  Title,
} from './styles';
import { setupAPIClient } from '../../../services/api';

type IProfile = {
  id: string;
  name: string;
};

interface IProfileProps {
  owner: IProfile;
  workers: IProfile[];
}

interface IUnitProfilesProps {
  unitId: string;
  triggerModal: () => void;
  isNewProfileCreated: boolean;
}

export function UnitProfiles({
  unitId,
  triggerModal,
  isNewProfileCreated,
}: IUnitProfilesProps) {
  const [profiles, setProfiles] = useState<IProfileProps>();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const api = setupAPIClient();

  useEffect(() => {
    if (!isNewProfileCreated && !isFirstRender) return;

    api.get(`/unit/data/${unitId}`).then(response => {
      setProfiles(response.data.profiles);
    });

    setIsFirstRender(false);
  }, [unitId, isNewProfileCreated]);

  return (
    <>
      {profiles ? (
        <Container>
          <Header>
            <Title>Perfis Associados</Title>
            <IoPersonAdd size={24} onClick={triggerModal} />
          </Header>

          <Content>
            <Profile isOwner key={profiles.owner?.id}>
              <ProfileText isOwner>
                {profiles.owner?.name || 'Nenhum responsável'}
              </ProfileText>
              <IoRibbon size={24} />
            </Profile>
            {profiles.workers.map(worker => (
              <Profile key={worker.id}>
                <ProfileText>{worker.name}</ProfileText>
                <IoPerson size={24} />
              </Profile>
            ))}
          </Content>
        </Container>
      ) : (
        <Skeleton w="280px" h="262px" startColor="#9e9e9e" endColor="#515151" />
      )}
    </>
  );
}
