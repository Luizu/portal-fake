import { AppLayout } from '../../layouts/AppLayout';
import { withSSRAuth } from '../../utils/withSSRAuth';

import { SalesConvertion } from '../../components/DashboardComponents/SalesConvertion';
import { TotalStores } from '../../components/DashboardComponents/TotalStores';
import { IncomingContacts } from '../../components/DashboardComponents/IncomingContacts';
import { SavedContacts } from '../../components/DashboardComponents/SavedContacts';

import {
  Container,
  Title,
  Content,
  VerticalBox,
} from '../../../shared/pages/Dashboard.styles';
import { Sales } from '../../components/DashboardComponents/Sales';
import { SoldUnits } from '../../components/DashboardComponents/SoldUnits';
import { Session } from '../../components/DashboardComponents/Session';

export default function Dashboard() {
  return (
    <AppLayout page="Dashboard">
      <Container>
        <Title>Dashboard</Title>

        <Content>
          <VerticalBox>
            <SalesConvertion />
            <Sales />
            <SoldUnits />
          </VerticalBox>

          <VerticalBox>
            <TotalStores />
            <IncomingContacts />
            <SavedContacts />
          </VerticalBox>

          <Session />
        </Content>
      </Container>
    </AppLayout>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
