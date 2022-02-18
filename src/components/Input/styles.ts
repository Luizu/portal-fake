import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Tooltip } from './Tooltip';
import { media } from '../../../shared/styles';

interface IContainerProps {
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;

  & + & {
    margin-top: 1rem;
  }
`;

export const Label = styled.label`
  color: var(--gray600);
  margin: 0 0 1rem 1.5rem;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 330px;
  height: 56px;
  background: var(--gray900);

  ${media.desktop} {
    width: 411px;
  }
`;

export const Inputbase = styled.input<IContainerProps>`
  width: 330px;
  height: 56px;
  border: none;
  padding: 1.5rem;

  font-weight: 600;

  ${media.desktop} {
    width: 411px;
  }

  background: var(--gray900);

  &:hover,
  &:focus {
    border: 2px solid #ffc107;
  }

  ${props =>
    props.isErrored &&
    css`
      transition: border-color 0.4s;
      border: 2px solid #c53030;
    `}

  ${props =>
    props.isFilled &&
    css`
      border: 2px solid #ffc107;
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  padding: 0 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
