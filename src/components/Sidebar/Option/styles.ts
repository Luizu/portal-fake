import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ActiveProps {
  isActive: boolean;
}

export const Container = styled.span<ActiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray200);
  cursor: pointer;

  svg {
    color: var(--gray50);
    margin-right: 24px;
  }

  &:hover {
    color: var(--yellow500);
    transition: color 0.2s;

    svg {
      color: var(--yellow500);
    }
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--yellow500);

      svg {
        color: var(--yellow500);
      }
    `}
`;
