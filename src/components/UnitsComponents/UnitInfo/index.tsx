import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from 'react-loading';
import {
  IoPencil,
  IoAt,
  IoAttach,
  IoReceiptOutline,
  IoCallOutline,
  IoWarning,
} from 'react-icons/io5';
import { toast } from 'react-toastify';
import { api } from '../../../services/apiClient';
import {
  Container,
  Content,
  ContentFooter,
  DeleteButton,
  Header,
  Info,
  InfoText,
  Title,
  Modal,
  ModalBackground,
  ModalTitle,
  Alert,
  ButtonsBox,
  CancelButton,
  ConfirmButton,
} from './styles';

type IUnit = {
  id: string;
  email: string;
  phone: string;
  CNPJ: string;
  yoogaUrl: string;
};

interface IUnitInfoProps {
  unit: IUnit;
  triggerProfileModal: () => void;
}

export function UnitInfo({ unit, triggerProfileModal }: IUnitInfoProps) {
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (): Promise<void> => {
    try {
      setIsDeleting(true);
      await api.delete(`/unit/${unit.id}`);
      toast.success('Unidade excluída com sucesso!');
      push('/Units');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      toast.error('Erro ao deletar unidade');
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Perfil</Title>
          <IoPencil size={24} onClick={triggerProfileModal} />
        </Header>
        <Content>
          <Info>
            <IoAt size={24} />
            <InfoText>{unit.email}</InfoText>
          </Info>

          <Info>
            <IoAttach size={24} />
            <InfoText>
              <a href={unit.yoogaUrl} target="_blank" rel="noreferrer">
                {unit.yoogaUrl}
              </a>
            </InfoText>
          </Info>

          <Info>
            <IoReceiptOutline size={24} />
            <InfoText>{unit.CNPJ}</InfoText>
          </Info>

          <ContentFooter>
            <Info>
              <IoCallOutline size={24} />
              <InfoText>{unit.phone}</InfoText>
            </Info>
            <DeleteButton onClick={() => setIsModalOpen(true)}>
              Deletar Unidade
            </DeleteButton>
          </ContentFooter>
        </Content>
      </Container>

      <ModalBackground isOpen={isModalOpen}>
        <Modal>
          <IoWarning size={124} />
          <ModalTitle>Você tem certeza?</ModalTitle>
          <Alert>
            Deletar uma unidade é uma ação irreversivel! <br /> Confirme apenas
            se você realmente deseja fazer isso!
          </Alert>

          <ButtonsBox>
            <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </CancelButton>

            <ConfirmButton
              type="submit"
              isDeleting={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <Loading type="spin" height="24px" width="24px" color="#fff" />
              ) : (
                'Tenho certeza'
              )}
            </ConfirmButton>
          </ButtonsBox>
        </Modal>
      </ModalBackground>
    </>
  );
}
