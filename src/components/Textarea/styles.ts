import styled from '@emotion/styled';
import { css } from '@emotion/react';
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

  font-size: 1rem;
  line-height: 1.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;

  background: var(--gray900);

  ${media.large} {
    width: 100%;
  }
`;

export const Inputbase = styled.textarea<IContainerProps>`
  width: 100%;
  height: 200px;

  border: none;
  padding: 1.5rem;
  resize: none;

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

    ${media.desktop} {
    height: 486px;
  }
`;
