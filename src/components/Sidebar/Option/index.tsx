import React, { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import { ActiveOption } from '../ActiveOption';
import { Container } from './styles';

interface IOptionProps {
  name: string;
  icon: ComponentType<IconBaseProps>;
  href: string;
}

export function Option({ name, icon: Icon, href }: IOptionProps) {
  return (
    <ActiveOption href={href} passHref>
      <Container isActive={false}>
        <Icon size={24} />
        {name}
      </Container>
    </ActiveOption>
  );
}
