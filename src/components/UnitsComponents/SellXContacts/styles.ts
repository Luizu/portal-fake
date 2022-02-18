import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  padding: 0 0 16px 24px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray700);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 0 24px;

  border-radius: 24px;
  width: 277px;
  height: 72px;

  background: var(--gray900);
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  gap: 24px;

  svg {
    color: var(--yellow500);
  }
`;

export const InfoText = styled.p`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  /* identical to box height */

  color: var(--gray400);
`;
