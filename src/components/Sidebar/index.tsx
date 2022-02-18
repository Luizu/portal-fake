import {
  IoGrid,
  IoStorefront,
  IoChatbubble,
  IoPricetag,
} from 'react-icons/io5';

import { Option } from './Option';
import { Container, Navigation } from './styles';

export function Sidebar() {
  return (
    <Container>
      <Navigation>
        <Option name="Home" icon={IoGrid} href="/Dashboard" />
        <Option name="Unidades" icon={IoStorefront} href="/Units" />
        <Option name="Mensagens" icon={IoChatbubble} href="/Messages" />
        <Option name="Tags" icon={IoPricetag} href="/Tags" />
      </Navigation>
    </Container>
  );
}
