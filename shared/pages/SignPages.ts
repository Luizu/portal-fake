import styled from '@emotion/styled';
import { Form as unform } from '@unform/web';
import { shade } from 'polished';

export const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 3rem;

  color: #b1b1b1;

  margin-bottom: 1rem;
`;

export const Form = styled(unform)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 56px;
`;

export const TextButton = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;

  color: var(--gray550);

  &:hover {
    color: var(--gray300);
    border-bottom: 2px solid var(--gray300);
  }
`;

export const Button = styled.button`
  width: 218px;
  height: 48px;

  background: var(--yellow500);
  color: var(--gray900);

  border: none;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 4px solid #f7f7f7;
    background: ${shade(0.2, '#ffc107')};
  }
`;
