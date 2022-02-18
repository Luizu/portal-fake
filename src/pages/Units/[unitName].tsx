import { useRouter } from 'next/router';
import { validate } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Switch } from '@chakra-ui/react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';
import { SiIfood } from 'react-icons/si';

// Api
import { setupAPIClient } from '../../services/api';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { getValidationErrors } from '../../utils/getValidationErrors';

// Compoments
import { UnitProfiles } from '../../components/UnitsComponents/UnitProfiles';
import { SavedContacts } from '../../components/UnitsComponents/SavedContacts';
import { ReceivedContacts } from '../../components/UnitsComponents/ReceivedContacts';
import { SellXContacts } from '../../components/UnitsComponents/SellXContacts';
import { ConvertedContacts } from '../../components/UnitsComponents/ConvertedContacts';
import { UnitInfo } from '../../components/UnitsComponents/UnitInfo';
import { Input } from '../../components/Input';
import { AppLayout } from '../../layouts/AppLayout';

import {
  Container,
  Content,
  ContentHeader,
  UnitProfile,
  UnitTrio,
  UnitName,
  BackButton,
  ProfileDiv,
  ProfileText,
  ProfileDivisor,
  UpContent,
  VerticalBox,
  ModalBackground,
  AccountModal,
  ModalTitle,
  Form,
  SwitchBox,
  SwitchBoxLabel,
  SubmitButton,
  ProfileModal,
  ModalVerticalContent,
  ModalContent,
  MerchantModal,
  ModalAlert,
  MerchantModalContent,
  MerchantForm,
  MerchantConfirmButton,
} from '../../../shared/pages/Units/unit.styles';

type IUnit = {
  id: string;
  name: string;
  trio: string;
  email: string;
  phone: string;
  CNPJ: string;
  yoogaUrl: string;
  n1MerchantId: string;
  gringoMerchantId: string;
  juliusMerchantId: string;
  fernandoMerchantId: string;
  arrozMerchantId: string;
  umayaMerchantId: string;
  profiles: IProfile[];
  contacts: IContact[];
  orders: IOrder[];
};

type IProfile = {
  id: string;
  name: string;
  email: string;
  isOwner: string;
};

type IContact = {
  id: string;
  number: string;
  origin: string;
};

type IOrder = {
  id: string;
};

interface IUnitProps {
  unit: IUnit;
}

interface IAccountFormData {
  name: string;
  email: string;
}

interface IProfileFormData {
  email: string;
  CNPJ: string;
  yoogaUrl: string;
  phone: string;
}

interface IMerchantFormData {
  n1MerchantId?: string;
  gringoMerchantId?: string;
  juliusMerchantId?: string;
  fernandoMerchantId?: string;
  arrozMerchantId?: string;
  umayaMerchantId?: string;
}

export default function Unit({ unit }: IUnitProps) {
  const api = setupAPIClient();

  const { push } = useRouter();
  const formRef = useRef<FormHandles>(null);
  const profileFormRef = useRef<FormHandles>(null);
  const merchantFormRef = useRef<FormHandles>(null);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMerchantModalOpen, setIsMerchantModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isNewProfileCreated, setIsNewProfileCreated] = useState(false);

  const handleAccountSubmit = async (data: IAccountFormData) => {
    try {
      setIsNewProfileCreated(false);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email } = data;

      await api.post(`/unit/${unit.id}/profile`, {
        name,
        email,
        unitId: unit.id,
        isOwner,
      });

      toast.success('Perfil de acesso criado com sucesso!');
      setIsAccountModalOpen(false);
      setIsNewProfileCreated(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      toast.error('Erro ao criar perfil de acesso');
    }
  };

  const handleProfileSubmit = async (data: IProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        CNPJ: Yup.string().required('CNPJ obrigatório'),
        yoogaUrl: Yup.string().required('URL obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, CNPJ, yoogaUrl, phone } = data;

      await api.put(`/unit/${unit.id}`, {
        email,
        CNPJ,
        yoogaUrl,
        phone,
      });

      toast.success('Perfil atualizado com sucesso!');
      setIsProfileModalOpen(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        profileFormRef.current?.setErrors(errors);
        return;
      }

      toast.error('Erro ao atualizar perfil');

      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleMerchantSubmit = async (data: IMerchantFormData) => {
    try {
      setIsSubmitting(true);
      merchantFormRef.current?.setErrors({});

      if (unit.trio === 'NGJ') {
        if (data.n1MerchantId === data.gringoMerchantId) {
          merchantFormRef.current?.setErrors({
            n1MerchantId: 'ID do N1 e do Gringo não podem ser iguais',
            gringoMerchantId: 'ID do Gringo e do N1 não podem ser iguais',
          });
          return;
        }

        if (data.n1MerchantId === data.juliusMerchantId) {
          merchantFormRef.current?.setErrors({
            n1MerchantId: 'ID do N1 e do Julius não podem ser iguais',
            juliusMerchantId: 'ID do Julius e do N1 não podem ser iguais',
          });
          return;
        }

        if (data.gringoMerchantId === data.juliusMerchantId) {
          merchantFormRef.current?.setErrors({
            gringoMerchantId: 'ID do Gringo e do Julius não podem ser iguais',
            juliusMerchantId: 'ID do Julius e do Gringo não podem ser iguais',
          });
          return;
        }

        if (!validate(data.n1MerchantId)) {
          merchantFormRef.current?.setErrors({
            n1MerchantId: 'ID do N1 em formato invalido',
          });
          return;
        }

        if (!validate(data.gringoMerchantId)) {
          merchantFormRef.current?.setErrors({
            gringoMerchantId: 'ID do Gringo em formato invalido',
          });
          return;
        }

        if (!validate(data.juliusMerchantId)) {
          merchantFormRef.current?.setErrors({
            juliusMerchantId: 'ID do Julius em formato invalido',
          });
          return;
        }
      }

      if (unit.trio === 'FUA') {
        if (!validate(data.fernandoMerchantId)) {
          merchantFormRef.current?.setErrors({
            fernandoMerchantId: 'ID do Fernando em formato invalido',
          });
          return;
        }

        if (!validate(data.arrozMerchantId)) {
          merchantFormRef.current?.setErrors({
            arrozMerchantId: 'ID do Arroz em formato invalido',
          });
          return;
        }

        if (!validate(data.umayaMerchantId)) {
          merchantFormRef.current?.setErrors({
            umayaMerchantId: 'ID da Umaya em formato invalido',
          });
          return;
        }

        if (data.fernandoMerchantId === data.arrozMerchantId) {
          merchantFormRef.current?.setErrors({
            fernandoMerchantId:
              'ID do Fernando e do Arroz não podem ser iguais',
            arrozMerchantId: 'ID do Arroz e do Fernando não podem ser iguais',
          });
          return;
        }

        if (data.fernandoMerchantId === data.umayaMerchantId) {
          merchantFormRef.current?.setErrors({
            fernandoMerchantId:
              'ID do Fernando e da Umaya não podem ser iguais',
            umayaMerchantId: 'ID do Umaya e da Fernando não podem ser iguais',
          });
          return;
        }

        if (data.arrozMerchantId === data.umayaMerchantId) {
          merchantFormRef.current?.setErrors({
            arrozMerchantId: 'ID do Arroz e da Umaya não podem ser iguais',
            umayaMerchantId: 'ID do Umaya e da Arroz não podem ser iguais',
          });
          return;
        }
      }

      const schema =
        unit.trio === 'NGJ'
          ? Yup.object().shape({
              n1MerchantId: Yup.string().required(
                'Merchant ID do N1 obrigatório',
              ),
              gringoMerchantId: Yup.string().required(
                'Merchant ID do Gringo obrigatório',
              ),
              juliusMerchantId: Yup.string().required(
                'Merchant ID do Julius obrigatório',
              ),
            })
          : Yup.object().shape({
              fernandoMerchantId: Yup.string().required(
                'Merchant ID do Fernando obrigatório',
              ),
              arrozMerchantId: Yup.string().required(
                'Merchant ID do Arroz obrigatório',
              ),
              umayaMerchantId: Yup.string().required(
                'Merchant ID do Umaya obrigatório',
              ),
            });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/unit/${unit.id}`, data);

      toast.success('Merchant Id`s cadastrados com sucesso!');
      setIsMerchantModalOpen(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        merchantFormRef.current?.setErrors(errors);
        return;
      }

      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'This merchant id is already taken':
            toast.error(
              "Um ou mais Merchant Id's já estão cadastrados para outra unidade, verifique e tente novamente",
            );
            break;

          default:
            toast.error(
              'Ops, ocorreu um erro aqui do nosso lado. Aguarde um pouquinho e tente novamente',
            );
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }

      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      unit.trio === 'NGJ' &&
      !unit.n1MerchantId &&
      !unit.gringoMerchantId &&
      !unit.juliusMerchantId
    ) {
      setIsMerchantModalOpen(true);
    }

    if (
      unit.trio === 'FUA' &&
      !unit.fernandoMerchantId &&
      !unit.arrozMerchantId &&
      !unit.umayaMerchantId
    ) {
      setIsMerchantModalOpen(true);
    }
  }, [unit]);

  return (
    <>
      <AppLayout page={unit.name}>
        <Container>
          <ContentHeader>
            <UnitProfile>
              <ProfileDiv>
                <UnitTrio>{unit.trio}</UnitTrio>
                <UnitName>{unit.name}</UnitName>
              </ProfileDiv>

              <ProfileDiv>
                <ProfileText>
                  {unit.profiles[0].name || 'Responsavel não definido'}
                </ProfileText>
                <ProfileDivisor />
                <ProfileText>{unit.phone}</ProfileText>
              </ProfileDiv>
            </UnitProfile>

            <BackButton onClick={() => push('/Units')}>Voltar</BackButton>
          </ContentHeader>

          <Content>
            <UpContent>
              <UnitProfiles
                unitId={unit.id}
                triggerModal={() => setIsAccountModalOpen(true)}
                isNewProfileCreated={isNewProfileCreated}
              />
              <VerticalBox>
                <SavedContacts id={unit.id} />
                <ReceivedContacts unitId={unit.id} />
              </VerticalBox>

              <VerticalBox>
                <SellXContacts id={unit.id} />
                <ConvertedContacts id={unit.id} />
              </VerticalBox>
            </UpContent>

            <UnitInfo
              unit={unit}
              triggerProfileModal={() => setIsProfileModalOpen(true)}
            />
          </Content>
        </Container>
      </AppLayout>

      <ModalBackground isOpen={isAccountModalOpen}>
        <AccountModal ref={formRef} onSubmit={handleAccountSubmit}>
          <IoClose size={24} onClick={() => setIsAccountModalOpen(false)} />

          <ModalTitle>Novo Perfil Associado</ModalTitle>

          <Form>
            <Input name="name" label="Nome" placeholder="Eduardo Castilho" />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="email@gmail.com"
            />

            <SwitchBox>
              <SwitchBoxLabel>Responsavel</SwitchBoxLabel>
              <Switch
                colorScheme="yellow"
                onChange={() => setIsOwner(!isOwner)}
                checked={isOwner}
              />
            </SwitchBox>

            <SubmitButton type="submit">Criar</SubmitButton>
          </Form>
        </AccountModal>
      </ModalBackground>

      <ModalBackground isOpen={isProfileModalOpen}>
        <ProfileModal
          ref={profileFormRef}
          onSubmit={handleProfileSubmit}
          initialData={{
            email: unit.email,
            yoogaUrl: unit.yoogaUrl,
            CNPJ: unit.CNPJ,
            phone: unit.phone,
          }}
        >
          <ModalTitle>Alterar Perfil</ModalTitle>
          <IoClose size={24} onClick={() => setIsProfileModalOpen(false)} />
          <Form>
            <ModalContent>
              <ModalVerticalContent>
                <Input name="email" label="Email" />
                <Input name="yoogaUrl" label="Link Yooga" />
              </ModalVerticalContent>
              <ModalVerticalContent>
                <Input name="CNPJ" label="CNPJ" />
                <Input name="phone" label="Telefone" />
              </ModalVerticalContent>
            </ModalContent>
          </Form>
          <SubmitButton type="submit">Atualizar</SubmitButton>
        </ProfileModal>
      </ModalBackground>

      <ModalBackground isOpen={isMerchantModalOpen}>
        <MerchantModal ref={merchantFormRef} onSubmit={handleMerchantSubmit}>
          <IoClose size={24} onClick={() => setIsMerchantModalOpen(false)} />

          <MerchantModalContent>
            <SiIfood size={124} />

            <ModalTitle>Inclusão dos Id`s do Ifood</ModalTitle>

            <ModalAlert>
              Essa unidade do trio {unit.trio} ainda não possui os{' '}
              <strong>merchant id`s do Ifood</strong> cadastrados.
              <br />
              Insira-os nos campos abaixo!
              <br />
              Caso não saiba onde encontrar{' '}
              <a
                href="https://docs.google.com/spreadsheets/d/1uzBoIJV62Q3SQwfMdCsI6kz4TBtaY56IX7qACfPvhUg/edit#gid=0"
                target="_blank"
                rel="noreferrer"
              >
                Clique aqui
              </a>
            </ModalAlert>

            <MerchantForm>
              <ModalVerticalContent>
                <Input
                  name={
                    unit.trio === 'NGJ' ? 'n1MerchantId' : 'fernandoMerchantId'
                  }
                  label={
                    unit.trio === 'NGJ'
                      ? 'N1 Merchant Id'
                      : 'Fernando Merchant Id'
                  }
                />
                <Input
                  name={
                    unit.trio === 'NGJ' ? 'gringoMerchantId' : 'arrozMerchantId'
                  }
                  label={
                    unit.trio === 'NGJ'
                      ? 'Gringo Merchant Id'
                      : 'Arroz Merchant Id'
                  }
                />
              </ModalVerticalContent>
              <ModalVerticalContent>
                <Input
                  name={
                    unit.trio === 'NGJ' ? 'juliusMerchantId' : 'umayaMerchantId'
                  }
                  label={
                    unit.trio === 'NGJ'
                      ? 'Julius Merchant Id'
                      : 'Umaya Merchant Id'
                  }
                />
                <MerchantConfirmButton isSubmitting={isSubmitting}>
                  Cadastrar
                </MerchantConfirmButton>
              </ModalVerticalContent>
            </MerchantForm>
          </MerchantModalContent>
        </MerchantModal>
      </ModalBackground>
    </>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);

  const { unitName } = ctx.params;

  const { data } = await apiClient.get(`/unit/${unitName}`);

  const unit = {
    ...data,
  };

  return {
    props: { unit },
  };
});
