import styled from '@emotion/styled';
import { media } from '../styles';

export const Container = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 38px 40px;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray500);

  padding: 0 24px;
`;

export const Content = styled.main`
  margin-top: 16px;

  display: flex;
  flex: 1;
  gap: 24px;

  ${media.desktop} {
    margin-top: 113px;
  }
`;

export const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
