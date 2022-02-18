import styled from '@emotion/styled';
import { Form as unform } from '@unform/web';
import { media } from '../../styles';

export const Container = styled(unform)`
  display: flex;
  flex: 1;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 72%;

  padding: 38px 40px;

  ${media.desktop} {
    width: 100%;
  }

  ${media.large} {
    width: 81%;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray500);
  padding: 0 24px;
`;

export const Form = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;

  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  gap: 24px;
`;

export const Aside = styled.aside`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px 64px 0 0;
`;

export const ButtonsBox = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

export const ConfirmButton = styled.button`
  width: 218px;
  height: 48px;

  background: var(--yellow500);
  border-radius: 7px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray900);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const BackButton = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 218px;
  height: 48px;

  background: var(--gray900);
  border-radius: 7px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray300);

  &:hover {
    color: var(--yellow500);
    border: 2px solid var(--yellow500);
  }
`;
