import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form as unform } from '@unform/web';
import { media } from '../styles';

interface ITabProps {
  isActive?: boolean;
}

interface IModalProps {
  isOpen: boolean;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 32px 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 64px;
`;

export const ContentPart = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray500);
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 104px;

  width: 216px;
  height: 48px;

  background: var(--gray900);

  border-radius: 7px;
`;

export const Tab = styled.div<ITabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray700);
  font-weight: 600;
  cursor: pointer;

  width: 50%;
  height: 100%;
  border-radius: 7px;

  cursor: not-allowed; //temporary while desactivated

  ${props =>
    props.isActive &&
    css`
      background: var(--gray700);
      color: var(--gray50);
      cursor: not-allowed;
    `}
`;

export const Button = styled.button`
  display: flex;
  align-items: center;

  width: 218px;
  height: 48px;

  background: var(--yellow500);
  border-radius: 8px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray900);

  svg {
    margin: 0 38px 0 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 72%;
  margin-top: 32px;

  ${media.desktop} {
    margin-top: 62px;
    max-width: 74%;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 24px 0 64px;

  ${media.desktop} {
    max-width: 1080px;
  }
`;

export const ContentTitle = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray50);
`;

export const IconsBox = styled.div`
  display: flex;
  gap: 16px;

  svg {
    cursor: pointer;

    &:hover {
      color: var(--yellow500);
      transition: 0.2s;
    }
  }

  .bin {
    color: var(--yellow500);

    &:hover {
      color: var(--red500);
      transition: 0.2s;
    }
  }
`;

export const ListContainer = styled.div`
  height: 43vh;
  margin-bottom: 16px;

  ${media.desktop} {
    height: 60vh;
  }
`;

export const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  padding: 16px 0 24px 64px;
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;

  width: 178px;
  height: 60px;
  border-radius: 8px;

  background: var(--gray700);
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0 16px;
`;

export const TagText = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const TagName = styled.h1`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.3rem;

  color: var(--gray50);
`;

export const TagId = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3rem;

  color: var(--gray350);
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const ErrorText = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  color: var(--gray50);
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

export const Modal = styled.div`
  width: 388px;
  background: #515151;
  border-radius: 8px;

  filter: drop-shadow(0px 4px 64px #000000);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 24px 0;
`;

export const ModalTitle = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;

export const ModalContent = styled(unform)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 32px;
`;

export const BackButton = styled.a`
  margin-left: 25px;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;

  color: var(--gray550);
  text-decoration: none;

  &:hover {
    color: var(--gray300);
    border-bottom: 2px solid var(--gray300);
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 149px;
  height: 48px;
  background: var(--yellow500);
  border-radius: 8px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray900);
`;
