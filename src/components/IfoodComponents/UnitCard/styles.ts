import styled from '@emotion/styled';
import { media } from '../../../../shared/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 280px;
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
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;

  gap: 16px;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.2rem;

  color: var(--gray50);

  ${media.desktop} {
    font-size: 1.5rem;
  }
`;

export const Session = styled.p``;

export const Info = styled.p`
  font-weight: 700;
  font-size: 0.875rem;

  color: var(--gray100);

  strong {
    font-weight: 600;
    color: var(--yellow500);
    padding-left: 8px;
  }
`;
