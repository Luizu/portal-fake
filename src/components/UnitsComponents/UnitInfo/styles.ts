import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { media } from '../../../../shared/styles';

interface IModalProps {
  isOpen: boolean;
}

interface DeleteProps {
  isDeleting: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 940px;

  ${media.desktop} {
    width: 70%;
    max-width: 1200px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: auto 0;
  width: 100%;
  padding: 0 24px;

  ${media.desktop} {
    width: 100%;
  }

  svg {
    color: var(--gray700);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: var(--yellow500);
    }
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray700);
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  margin-top: 16px;

  height: 252px;
  border-radius: 24px;
  background: var(--gray900);

  padding: 24px 28px;

  gap: 38px;
  width: 100%;

  ${media.desktop} {
    width: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;

  svg {
    color: var(--yellow500);
  }
`;

export const InfoText = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.312rem;

  color: var(--gray600);

  a {
    &:hover {
      color: var(--gray500);

      text-decoration: underline;
    }
  }
`;

export const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const DeleteButton = styled.p`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.312rem;

  color: var(--red500);
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const ModalBackground = styled.div<IModalProps>`
  visibility: ${props => (props.isOpen === true ? 'visible' : 'hidden')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 550px;
  height: 418px;
  position: relative;

  background: var(--gray800);
  border-radius: 8px;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 40px 32px;
  gap: 2rem;

  svg {
    color: var(--red500);
  }
`;

export const ModalTitle = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;

export const Alert = styled.p`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  text-align: center;
  color: var(--gray100);
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const CancelButton = styled.button`
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

export const ConfirmButton = styled.button<DeleteProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 218px;
  height: 48px;

  background: var(--red500);
  border-radius: 8px;

  font-family: Poppins;
  font-weight: 600;
  font-size: 1rem;

  color: var(--gray50);

  transition: width 1s, height 1s, border-radius 1s, background-color 0.2s;

  &:hover {
    background: #a00000;
  }

  ${props =>
    props.isDeleting &&
    css`
      width: 50px;
      height: 48px;
      border-radius: 50%;
    `}
`;
