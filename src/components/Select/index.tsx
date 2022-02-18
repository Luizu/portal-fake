import React, { ReactElement, SelectHTMLAttributes } from 'react';

import { Container, Label, InputContainer, Inputbase } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: object;
  label?: string;
  children: ReactElement[];
}

export function Select({
  name,
  label,
  children,
  containerStyle = {},
  ...rest
}: SelectProps): JSX.Element {
  return (
    <Container>
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <InputContainer style={containerStyle}>
        <Inputbase name={name} {...rest} style={containerStyle}>
          {children}
        </Inputbase>
      </InputContainer>
    </Container>
  );
}
