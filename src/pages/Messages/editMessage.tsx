import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import Loading from 'react-loading';

import { useRouter } from 'next/router';
import { api } from '../../services/apiClient';
import { getValidationErrors } from '../../utils/getValidationErrors';

import { AppLayout } from '../../layouts/AppLayout';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/Textarea';

import {
  Container,
  Content,
  Aside,
  Title,
  Form,
  ButtonsBox,
  ConfirmButton,
  BackButton,
} from '../../../shared/pages/Messages/newActivation.styles';
import { queryClient } from '../../services/queryClient';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupAPIClient } from '../../services/api';

interface SSRReturn {
  activationMessage: IActivationProps;
}

interface IActivationProps {
  id: string;
  title: string;
  body: string;
}

interface IActivationFormData {
  title: string;
  body: string;
}

export default function EditMessage({ activationMessage }: SSRReturn) {
  const formRef = useRef<FormHandles>(null);

  const [newTitle, setNewTitle] = useState(activationMessage.title);
  const [bodyErrored, setBodyErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const handleSubmit = async (data: IActivationFormData) => {
    try {
      setIsLoading(true);

      formRef.current?.setErrors({});

      if (data.title === 'Nova Mensagem') {
        // eslint-disable-next-line no-param-reassign
        delete data.title;
      }

      if (data.body === undefined || data.body.length <= 1) {
        throw new Error('Preencha o campo corpo da mensagem');
      }

      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/activationMessage/${activationMessage.id}`, data);

      setBodyErrored(false);

      toast.success('Mensagem criada com sucesso');

      await queryClient.invalidateQueries('activation');

      push('/Messages');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      if (err.response.data) {
        switch (err.response.data.message) {
          case 'Title is already taken"':
            toast.error(
              'Titulo de mensagem já está sendo utilizado, por favor selecione outro!',
            );
            break;

          default:
            toast.error('Erro ao atualizar a mensagem, tente novamente');
            // eslint-disable-next-line no-console
            console.log(err.response.data?.message);
            break;
        }

        return;
      }

      if (err instanceof Error) {
        toast.error('Prrencha o corpo da mensagem!');
        setBodyErrored(true);
        return;
      }

      toast.error(
        'Ops, ocorreu um erro aqui do nosso lado. Aguarde um pouquinho e tente novamente',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Container
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{
          title: activationMessage.title,
          body: activationMessage.body,
        }}
      >
        <Content>
          <Title>{newTitle || 'Insira o titulo no campo a baixo'}</Title>

          <Form>
            <Input
              name="title"
              label="Titulo"
              onChange={e => setNewTitle(e.target.value)}
              containerStyle={{ width: '100%' }}
            />
            <TextArea name="body" label="Mensagem" isErrored={bodyErrored} />
          </Form>
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
                'Salvar'
              )}
            </ConfirmButton>
            <BackButton onClick={() => push('/Messages')}>Voltar</BackButton>
          </ButtonsBox>
        </Aside>
      </Container>
    </AppLayout>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);

  const { id } = ctx.query;

  const { data } = await apiClient.get(`/activationMessage/${id}`);

  const activationMessage = data;

  return {
    props: { activationMessage },
  };
});
