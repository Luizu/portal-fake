import styled from '@emotion/styled';
import { media } from '../../../../shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 280px;
  height: 98px;
  background: var(--gray900);
  border-radius: 24px;

  padding: 36px 28px;

  gap: 28px;

  ${media.desktop} {
    width: 338px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 0.875rem;

  color: var(--gray50);

  ${media.desktop} {
    font-size: 1rem;
  }
`;

export const Info = styled.p`
  font-weight: 700;
  font-size: 2rem;

  color: var(--yellow500);
`;
