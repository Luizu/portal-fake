import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  width: 100%;
  height: 126px;
  min-height: 126px;
  padding: 0 64px;
  border-bottom: 2px solid var(--gray700);
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const Welcoming = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WelcomingText = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--gray50);

  strong {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;
