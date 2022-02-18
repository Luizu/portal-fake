import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form as unform } from '@unform/web';
import { media } from '../../styles';

interface IModalProps {
  isOpen: boolean;
}

interface MerchantProps {
  isSubmitting: boolean;
}

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;

  overflow: auto;

  padding: 32px 40px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;

  margin-top: 82px;
  gap: 16px;
`;

export const UpContent = styled.div`
  display: flex;
  gap: 40px;
`;

export const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const UnitProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 0 24px;
  gap: 8px;
`;

export const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnitTrio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 66px;
  height: 36px;
  border-radius: 8px;
  background: var(--gray900);

  font-family: Poppins;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--yellow500);
`;

export const UnitName = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray50);

  padding-left: 16px;
`;

export const ProfileText = styled.p`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: left;

  color: #7e7e7e;
`;

export const ProfileDivisor = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;

  background: var(--gray500);

  margin: 0 14px;
`;

export const BackButton = styled.button`
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

export const ModalBackground = styled.div<IModalProps>`
  visibility: ${props => (props.isOpen === true ? 'visible' : 'hidden')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccountModal = styled(unform)`
  width: 388px;
  height: 458px;

  position: relative;

  background: var(--gray700);
  border-radius: 8px;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 40px 32px;

  ${media.desktop} {
    width: 500px;
    height: 458px;
  }

  svg {
    position: absolute;
    top: 20px;
    right: 24px;
    color: var(--yellow500);

    &:hover {
      cursor: pointer;
      color: var(--red500);
    }
  }
`;

export const ModalTitle = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;

export const ModalAlert = styled.p`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  text-align: center;
  color: var(--gray100);

  a {
    font-weight: bold;
    color: var(--yellow500);

    &:hover {
      filter: brightness(0.8);

      text-decoration: underline;

      transition: color 0.2s ease-in-out;
    }
  }
`;

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding-top: 24px;
`;

export const SwitchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding-top: 24px;
`;

export const SwitchBoxLabel = styled.p`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.31rem;

  color: var(--gray500);
`;

export const SubmitButton = styled.button`
  margin-top: 26px;

  width: 308px;
  height: 48px;

  background: var(--yellow500);
  border-radius: 8px;

  font-family: Poppins;
  font-weight: 600;
  font-size: 1rem;

  color: var(--gray900);
`;

export const ProfileModal = styled(unform)`
  width: 900px;
  height: 418px;
  position: relative;

  background: var(--gray800);
  border-radius: 8px;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 40px 32px;

  svg {
    position: absolute;
    top: 20px;
    right: 24px;
    color: var(--yellow500);

    &:hover {
      cursor: pointer;
      color: var(--red500);
    }
  }
`;

export const MerchantModal = styled(unform)`
  width: 900px;
  height: 600px;
  position: relative;

  background: var(--gray800);
  border-radius: 8px;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 40px 32px;

  svg {
    position: absolute;
    top: 20px;
    right: 24px;
    color: var(--yellow500);

    &:hover {
      cursor: pointer;
      color: var(--red500);
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const MerchantModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;

  svg {
    position: initial;
    color: var(--red500);
  }
`;

export const MerchantForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;
`;

export const MerchantConfirmButton = styled.button<MerchantProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 411px;
  height: 56px;

  background: var(--yellow500);
  border-radius: 8px;

  font-family: Poppins;
  font-weight: 600;
  font-size: 1rem;

  color: var(--gray900);

  transition: width 1s, height 1s, border-radius 1s, background-color 0.2s;

  margin-top: 3.3rem;

  &:hover {
    filter: brightness(0.8);
  }

  ${props =>
    props.isSubmitting &&
    css`
      width: 50px;
      height: 48px;
      border-radius: 50%;
    `}
`;

export const ModalVerticalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
