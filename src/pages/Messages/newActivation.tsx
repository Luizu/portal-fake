import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import Loading from 'react-loading';

import { useRouter } from 'next/router';
import { useWindowWidth } from '@react-hook/window-size';
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
  FormHeader,
} from '../../../shared/pages/Messages/newActivation.styles';
import { queryClient } from '../../services/queryClient';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { Select } from '../../components/Select';

interface IActivationProps {
  title: string;
  body: string;
}

export default function CreateMessage() {
  const formRef = useRef<FormHandles>(null);
  const width = useWindowWidth();

  const [title, setTitle] = useState('Nova Mensagem');
  const [bodyErrored, setBodyErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trio, setTrio] = useState<string>('NGJ');

  const { push } = useRouter();

  const handleTrioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrio(e.target.value);
  };

  const handleSubmit = async (data: IActivationProps) => {
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

      await api.post('/activationMessage', {
        ...data,
        trio,
      });

      setTitle('');
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

      if (err.response?.data) {
        switch (err.response.data?.message) {
          case 'This title is already taken':
            toast.error('Titulo já em uso, escolha outro e tente novamente!');
            break;

          default:
            toast.error(
              'Ops, ocorreu um erro aqui do nosso lado. Aguarde um pouquinho e tente novamente',
            );
            break;
        }
        return;
      }

      if (err instanceof Error) {
        toast.error('Prrencha o corpo da mensagem!');
        setBodyErrored(true);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout page="Nova Mensagem de Ativação">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Content>
          <Title>{title || 'Insira o titulo no campo a baixo'}</Title>

          <Form>
            <FormHeader>
              <Select
                name="trio"
                label="Trio"
                onChange={e => handleTrioChange(e)}
              >
                <option value="NGJ">NGJ</option>
                <option value="FUA">FUA</option>
              </Select>

              <Input
                name="title"
                label="Titulo"
                onChange={e => setTitle(e.target.value)}
                containerStyle={{ width: '100%' }}
                marginStyle={{
                  width: width < 1600 ? '71%' : '100%',
                  margin: 0,
                }}
              />
            </FormHeader>
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
  return {
    props: {},
  };
});
