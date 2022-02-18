import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import React, { useRef, useState } from 'react';

import Loading from 'react-loading';
import { toast } from 'react-toastify';
import { Input } from '../../components/Input';

import {
  Button,
  ButtonsContainer,
  Form,
  TextButton,
  Title,
} from '../../../shared/pages/SignPages';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { api } from '../../services/apiClient';
import { SignLayout } from '../../layouts/SignLayout';
import { withSSRGuest } from '../../utils/withSSRGuest';

interface ISignUpProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function Register() {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const handleSignUp = async (data: ISignUpProps) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
          .min(6, 'Minimo de 6 Caracteres'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'As senhas não são iguais',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/account', data);

      toast.success('Cadastro realizado com sucesso!');
      push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'Email is already taken, try using another one':
            toast.error(
              'Email já em uso, verifique seus dados e tente novamente',
            );
            break;

          default:
            toast.error('Erro ao fazer cadastro, tente novamente');
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignLayout>
      <Title>Cadastro</Title>
      <Form onSubmit={handleSignUp} ref={formRef}>
        <Input name="name" label="Name" />
        <Input name="email" label="Email" />
        <Input name="password" label="Senha" type="password" />
        <Input
          name="passwordConfirmation"
          label="Confirmar Senha"
          type="password"
        />

        <ButtonsContainer>
          <TextButton onClick={() => push('/')}>Voltar</TextButton>

          <Button type="submit">
            {isLoading ? (
              <Loading
                type="spinningBubbles"
                height="24px"
                width="10%"
                color="var(--gray900)"
              />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </ButtonsContainer>
      </Form>
    </SignLayout>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {},
  };
});
