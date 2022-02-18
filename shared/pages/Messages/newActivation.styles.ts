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
  width: 68%;

  padding-left: 40px;

  ${media.desktop} {
    width: 70%;
  }

  ${media.large} {
    width: 78%;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;
  color: var(--gray500);

  margin: 38px 0 48px 24px;
`;

export const Form = styled.div``;

export const FormHeader = styled.div`
  display: flex;

  gap: 16px;

  margin-bottom: 16px;
`;

export const Aside = styled.aside`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  margin: 32px 40px 0 0;
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
