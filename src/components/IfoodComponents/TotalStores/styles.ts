import styled from '@emotion/styled';
import { media } from '../../../../shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 22px 38px;

  width: 280px;
  height: 195px;
  background: var(--gray900);
  border-radius: 16px;

  gap: 48px;

  ${media.desktop} {
    width: 338px;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;

export const Info = styled.h1`
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.5rem;

  color: var(--yellow500);
`;
