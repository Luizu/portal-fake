import styled from '@emotion/styled';
import { Form as unform } from '@unform/web';
import { media } from '../../styles';

interface IModalProps {
  isOpen: boolean;
}

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 38px;
  width: 72%;
`;

export const Title = styled.input`
  padding-left: 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  background: transparent;
  color: var(--gray500);

  max-width: 350px;

  &::placeholder {
    color: var(--gray500);
  }

  margin-right: 16px;

  //add border when errored
`;
export const MessagesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 48px;

  width: 100%;
  margin-top: 32px;

  ${media.desktop} {
    margin-top: 82px;
  }
`;

export const NewMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 150px;
  background: var(--gray900);
  border-radius: 24px;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    border: 3px solid var(--yellow500);

    svg {
      color: var(--yellow500);
    }
  }

  ${media.desktop} {
    width: 216px;
    height: 216px;
  }
`;

export const Header = styled.div``;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;

  padding: 32px 40px;

  gap: 24px;
`;

export const TagBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

export const TagInput = styled.input`
  width: 218px;
  height: 48px;
  background: var(--gray900);
  border-radius: 8px;

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: Poppins;

  color: #9e9e9e;
  padding: 0 24px;
  &::placeholder {
    color: #9e9e9e;
  }

  &:disabled {
    cursor: not-allowed;
    border: 2px solid var(--yellow500);
    color: var(--yellow500);
  }
`;

export const TagList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 218px;
  border-radius: 8px;
  background: var(--gray900);
  position: absolute;
  top: 38px;
  padding-top: 12px;
`;

export const Tag = styled.p`
  width: 218px;
  height: 48px;

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;

  text-align: center;

  color: #9e9e9e;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const TagCreate = styled.p`
  width: 218px;
  height: 48px;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;

  text-align: center;
  cursor: pointer;

  color: var(--yellow500);

  &:hover {
    filter: brightness(1.2);
  }
`;

export const SaveButton = styled.button`
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

export const DeleteButton = styled.button`
  width: 218px;
  height: 48px;

  background: #c62828;
  border-radius: 8px;

  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #ffffff;
`;

export const BackButton = styled.button`
  width: 218px;
  height: 48px;

  background: #222222;
  border-radius: 8px;

  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #b1b1b1;
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
  justify-content: flex-end;
  align-items: center;
`;

export const Modal = styled.div`
  width: 400px;
  height: 100vh;
  background: #3b3b3b;

  filter: drop-shadow(0px 4px 64px #000000);

  display: flex;
  flex-direction: column;

  padding: 0 40px;
`;

export const ModalTitle = styled.h1`
  margin-top: 78px;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;

  color: #7e7e7e;

  padding: 0 24px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #515151;

  padding: 16px 24px;
`;

export const ModalBody = styled.textarea`
  width: 316px;
  height: 280px;
  resize: none;

  background: #222222;

  padding: 26px 24px;

  ${media.desktop} {
    width: 316px;
    height: 486px;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 56px;
`;

export const ModalBack = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  cursor: pointer;
  color: #7f7f7f;
  padding-left: 24px;
`;

export const ModalSave = styled.button`
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

export const TagModalBackground = styled.div<IModalProps>`
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

export const TagModal = styled.div`
  width: 388px;
  height: 418px;
  background: #515151;
  border-radius: 8px;

  filter: drop-shadow(0px 4px 64px #000000);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TagModalTitle = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray50);
`;

export const TagModalContent = styled(unform)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TagButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 32px;
`;

export const TagBackButton = styled.a`
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

export const TagSubmitButton = styled.button`
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
