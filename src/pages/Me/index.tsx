import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loading from 'react-loading';
import { Avatar, SkeletonCircle, Skeleton } from '@chakra-ui/react';
import { IoCamera } from 'react-icons/io5';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AppLayout } from '../../layouts/AppLayout';
import { AuthContext } from '../../contexts/AuthContext';

import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupAPIClient } from '../../services/api';
import { Input } from '../../components/Input';
import { getValidationErrors } from '../../utils/getValidationErrors';

import {
  Container,
  Content,
  Title,
  Aside,
  ButtonsBox,
  ConfirmButton,
  BackButton,
  MeContainer,
  MeHeader,
  MeAvatar,
  AvatarIcon,
  Profile,
  ProfileDiv,
  Name,
  ProfileText,
  ProfileDivisor,
  MeForm,
  VerticalBox,
} from '../../../shared/pages/me.styles';

interface IFormProps {
  name: string;
  email: string;
  username?: string;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

export default function Me() {
  const formRef = useRef<FormHandles>();
  const { account, updateAccount } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [me, setMe] = useState(account);
  const { back } = useRouter();

  const api = setupAPIClient();

  useEffect(() => {
    setMe(account);
  }, [account]);

  const handleSubmit = async (data: IFormProps) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        oldPassword: Yup.string(),
        password: Yup.string().when('oldPassword', {
          is: val => !!val.length,
          then: Yup.string()
            .required('Campo obrigatório')
            .min(6, 'No mínimo 6 caracteres'),
          otherwise: Yup.string(),
        }),
        passwordConfirmation: Yup.string()
          .when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, username, oldPassword, password } = data;

      const formData = {
        name,
        email,
        username,
        ...(oldPassword ? { oldPassword, password } : {}),
      };

      await api.put('/account', formData);

      await updateAccount();
      toast.success('Dados atualizados com sucesso!');
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'Old password does not match':
            toast.error('Senha antiga incorreta, tente novamente!');
            break;

          default:
            toast.error('Ocorreu um erro ao atualizar os dados!');
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }
      // eslint-disable-next-line
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUpdatingAvatar(true);

      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('avatar', file);

      await api.patch('/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await updateAccount();

      toast.success('Avatar atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar avatar');
      // eslint-disable-next-line
      console.log(err);
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  return (
    <AppLayout>
      <Container
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{
          name: me?.name,
          email: me?.email,
          username: me?.username,
        }}
      >
        <Content>
          <Title>Perfil</Title>

          <MeContainer>
            <MeHeader>
              {isUpdatingAvatar ? (
                <SkeletonCircle
                  w="220px"
                  h="220px"
                  startColor="#9e9e9e"
                  endColor="#515151"
                />
              ) : (
                <MeAvatar htmlFor="avatar">
                  <Avatar
                    src={me?.avatarUrl}
                    w="220px"
                    h="220px"
                    bg="var(--gray800)"
                  />

                  <AvatarIcon>
                    <IoCamera size={24} />
                    <input
                      type="file"
                      id="avatar"
                      onChange={e => handleAvatarChange(e)}
                    />
                  </AvatarIcon>
                </MeAvatar>
              )}

              <Profile>
                <ProfileDiv>
                  {me || isLoading ? (
                    <Name>{me.name}</Name>
                  ) : (
                    <Skeleton w="419px" />
                  )}
                </ProfileDiv>

                <ProfileDiv>
                  {me || isLoading ? (
                    <ProfileText>
                      {me.username ? me.username : 'Apelido não definido'}
                    </ProfileText>
                  ) : (
                    <Skeleton w="419px" />
                  )}
                  <ProfileDivisor />
                  {me || isLoading ? (
                    <ProfileText>
                      {me.role ? me.role : 'Cargo não definido'}
                    </ProfileText>
                  ) : (
                    <Skeleton w="419px" />
                  )}
                </ProfileDiv>
              </Profile>
            </MeHeader>

            <MeForm>
              <VerticalBox>
                <Input name="name" label="Nome" />
                <Input name="username" label="Nome de Usuário (Apelido)" />
                <Input name="email" label="Email" type="email" />
              </VerticalBox>

              <VerticalBox>
                <Input name="oldPassword" label="Senha Atual" type="password" />
                <Input name="password" label="Nova Senha" type="password" />
                <Input
                  name="passwordConfirmation"
                  label="Confirmar Nova Senha"
                  type="password"
                />
              </VerticalBox>
            </MeForm>
          </MeContainer>
        </Content>
        <Aside>
          <ButtonsBox>
            <ConfirmButton type="submit">
              {isLoading ? (
                <Loading
                  type="spinningBubbles"
                  height="24px"
                  width="10%"
                  color="var(--gray900)"
                />
              ) : (
                'Confirmar'
              )}
            </ConfirmButton>
            <BackButton onClick={back}>Voltar</BackButton>
          </ButtonsBox>
        </Aside>
      </Container>
    </AppLayout>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
