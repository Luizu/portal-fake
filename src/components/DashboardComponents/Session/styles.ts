import styled from '@emotion/styled';

interface SessionProps {
  isOnline?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 110px;

  width: 338px;
  height: 456px;
  background: var(--gray900);

  border-radius: 24px;

  padding: 22px 38px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoContent = styled.div``;

export const InfoTitle = styled.h1`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;

export const InfoCounter = styled.p<SessionProps>`
  font-weight: 800;
  font-size: 3rem;
  line-height: 4.5rem;

  color: ${props => (props.isOnline ? '#16C142' : '#C62828')};
`;

export const BigIcon = styled.div<SessionProps>`
  width: 56px;
  height: 56px;

  background: ${props =>
    props.isOnline ? 'rgba(37, 241, 90, 0.3);' : 'rgba(243, 76, 76, 0.3)'};

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: grow 3s infinite;
`;

export const SmallIcon = styled.div<SessionProps>`
  width: 26px;
  height: 26px;

  background: ${props => (props.isOnline ? '#16C142' : '#C62828')};
  box-shadow: 0px 0px 23px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
`;
