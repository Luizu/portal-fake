import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 150px;
  height: 150px;

  background: var(--gray900);
  border-radius: 24px;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    border: 3px solid var(--yellow500);
  }

  ${media.desktop} {
    width: 216px;
    height: 216px;
  }
`;

export const Position = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray380);
  margin-bottom: 16px;
`;

export const Body = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: var(--gray800);

  padding: 0 20px 0 27px;
`;
