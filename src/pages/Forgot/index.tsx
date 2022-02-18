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
  TextButton,
  Title,
} from '../../../shared/pages/SignPages';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { api } from '../../services/apiClient';
import { SignLayout } from '../../layouts/SignLayout';

interface IForgotProps {
  email: string;
}

export default function Forgot() {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const handleForgot = async (data: IForgotProps) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/password/forgot', data);

      toast.success(
        'Solicitação recebida com sucesso, verifique a caixa de entrada do seu email!',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }
      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'Account does not exists':
            toast.error(
              'Conta não localizada, verifique seu email e tente novamente',
            );
            break;

          default:
            toast.error('Erro ao processar a sua solicitação, tente novamente');
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
      <Title>Recuperar Senha</Title>
      <Form onSubmit={handleForgot} ref={formRef}>
        <Input name="email" label="Email" />

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
              'Enviar'
            )}
          </Button>
        </ButtonsContainer>
      </Form>
    </SignLayout>
  );
}
