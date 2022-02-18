import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useRef, useState } from 'react';

import Loading from 'react-loading';
import { toast } from 'react-toastify';
import { Input } from '../../components/Input';

import {
  Button,
  ButtonsContainer,
  Form,
  Title,
} from '../../../shared/pages/SignPages';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { api } from '../../services/apiClient';
import { SignLayout } from '../../layouts/SignLayout';

interface IResetProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function ResetPassword() {
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const handleReset = async (data: IResetProps) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
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

      await api.post(`password/reset/${query.token}`, data);

      toast.success(
        'Senha alterada com sucesso! Agora você já pode acessar a plataforma novamente',
      );
      push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }
      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'Token invalid!':
            toast.error('Token de recuperação invalido');
            break;

          case 'Token expired!':
            toast.error('Prazo de recuperação expirado');
            break;

          default:
            toast.error('Erro ao recuperar sua senha, tente novamente');
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }

      toast.error(
        'Ops, ocorreu um erro aqui do nosso lado. Aguarde um pouquinho e tente novamente',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignLayout>
      <Title>Nova Senha</Title>
      <Form onSubmit={handleReset} ref={formRef}>
        <Input name="password" label="Senha" type="password" />
        <Input
          name="passwordConfirmation"
          label="Confirmar Senha"
          type="password"
        />

        <ButtonsContainer style={{ justifyContent: 'flex-end' }}>
          <Button type="submit">
            {isLoading ? (
              <Loading
                type="spinningBubbles"
                height="24px"
                width="10%"
                color="var(--gray900)"
              />
            ) : (
              'Alterar'
            )}
          </Button>
        </ButtonsContainer>
      </Form>
    </SignLayout>
  );
}
