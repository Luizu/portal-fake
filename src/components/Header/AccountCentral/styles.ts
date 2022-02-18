import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IMenuProps {
  isOpen?: boolean;
}

interface IOptionProps {
  isExit?: boolean;
}

export const Container = styled.div<IMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 64px;
  position: relative;
  height: 64px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: var(--gray900);
    border-radius: ${props => (props.isOpen ? '32px 32px 0 0' : '32px')};
  }

  ${props =>
    props.isOpen &&
    css`
      background: var(--gray900);
      border-radius: 32px 32px 0 0;
    `}
`;

export const User = styled.div<IMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.isOpen &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}

  svg {
    margin-left: 26px;
  }
`;

export const Userinfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  margin-left: 8px;
`;

export const Name = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;
export const Role = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;

  color: var(--gray200);
`;

export const SuspenseMenu = styled.div<IMenuProps>`
  display: none;
  transition: 0.2s;
  visibility: ${props => (props.isOpen === true ? 'visible' : 'hidden')};
  z-index: 1;

  ${props =>
    props.isOpen &&
    css`
      position: absolute;
      background: var(--gray900);
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      bottom: -112px;
      border-radius: 0 0 32px 32px;
    `}
`;

export const Option = styled.span<IOptionProps>`
  background: var(--gray900);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  display: flex;
  padding: 16px;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border-radius: 0 0 32px 32px;

  color: ${props => (props.isExit ? 'var(--yellow500)' : 'var(--gray400)')};

  &:hover {
    filter: brightness(1.2);
  }
`;
