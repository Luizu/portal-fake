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
  justify-content: center;

  border-radius: 24px;
  gap: 60px;
  padding: 0 24px;

  width: 277px;
  height: 134px;

  background: var(--gray900);
`;

export const Text = styled.h1`
  font-weight: bold;
  font-size: 3rem;
  line-height: 4.5rem;

  color: var(--yellow500);
`;
