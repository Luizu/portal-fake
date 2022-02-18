import { useContext, useState } from 'react';
import Link from 'next/link';
import { IoChevronDown } from 'react-icons/io5';
import { Avatar, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { AuthContext } from '../../../contexts/AuthContext';

import {
  Container,
  User,
  Userinfo,
  Name,
  Role,
  SuspenseMenu,
  Option,
} from './styles';

export function AccountCentral() {
  const { account, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container isOpen={isOpen}>
      {account ? (
        <User isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <Avatar
            w="48px"
            h="48px"
            name={account.name}
            src={account.avatarUrl}
            bg="var(--gray800)"
          />

          <Userinfo>
            <Name>{account.name}</Name>
            {account.role && <Role>{account.role}</Role>}
          </Userinfo>

          <IoChevronDown size={16} />
        </User>
      ) : (
        <User>
          <SkeletonCircle w="48px" h="48px" />

          <Userinfo>
            <Skeleton w="100px" h="24px" />
            <Skeleton w="100px" h="24px" />
          </Userinfo>
        </User>
      )}

      <SuspenseMenu isOpen={isOpen}>
        <Link href="/Me">
          <Option>Gerenciar Perfil</Option>
        </Link>
        <Option isExit onClick={signOut}>
          Sair
        </Option>
      </SuspenseMenu>
    </Container>
  );
}
