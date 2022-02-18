import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Loading from 'react-loading';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useWindowWidth } from '@react-hook/window-size';
import { AppLayout } from '../../layouts/AppLayout';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import {
  Container,
  Content,
  Form,
  FormGroup,
  Title,
  Aside,
  ButtonsBox,
  ConfirmButton,
  BackButton,
} from '../../../shared/pages/Units/create.styles';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { setupAPIClient } from '../../services/api';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { queryClient } from '../../services/queryClient';

interface IFormData {
  name: string;
  unitOwner: string;
  email: string;
  phone: string;
  CNPJ: string;
  yoogaUrl: string;
}

export default function CreateUnit() {
  const { push } = useRouter();
  const width = useWindowWidth();
  const api = setupAPIClient();

  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [trio, setTrio] = useState<string>('NGJ');

  const handleTrioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrio(e.target.value);
  };

  const handleSubmit = async (data: IFormData) => {
    try {
      setIsLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        unitOwner: Yup.string().required('Nome do Franqueado obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
        CNPJ: Yup.string().required('CNPJ obrigatório'),
        yoogaUrl: Yup.string().required('URL obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/unit', {
        ...data,
        trio,
      });

      toast.success('Unidade criada com sucesso!');
      queryClient.invalidateQueries('unit');
      push(`/Units/${response.data.id}`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      if (err.response.data) {
        switch (err.response.data?.message) {
          case 'A Unit with this storeId/CNPJ already exists':
            toast.error('Opa! Uma unidade já existe com esse ID e/ou CNPJ.');
            break;

          case 'Name for this trio is already in use':
            toast.error(
              'Eiii! Já existe uma unidade com esse nome para esse trio!',
            );
            break;

          default:
            toast.error(
              'Opa! Ocorreu um errinho aqui do nosso lado ao tentar criar essa unidade, tenta dnovo ai pra gente!',
            );
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }

        return;
      }

      toast.error(
        'Opa! Ocorreu um errinho aqui do nosso lado ao tentar criar essa unidade, tenta dnovo ai pra gente!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout page="Nova Unidade">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Content>
          <Title>Criar Unidade</Title>

          <Form>
            <FormGroup>
              <Select
                name="trio"
                label="Trio"
                onChange={e => handleTrioChange(e)}
              >
                <option value="NGJ">NGJ</option>
                <option value="FUA">FUA</option>
              </Select>

              <Input
                name="name"
                placeholder="Insira o nome da unidade"
                label="Nome da unidade"
                marginStyle={{ margin: 0 }}
                containerStyle={{ width: width < 1400 ? '275px' : '500px' }}
              />

              <Input
                name="unitOwner"
                placeholder="Insira o nome do Franqueado"
                label="Nome do Franqueado"
                marginStyle={{ margin: 0 }}
                containerStyle={{ width: width < 1400 ? '275px' : '500px' }}
              />
            </FormGroup>

            <FormGroup>
              <Input
                name="email"
                placeholder="Insira o email da unidade"
                label="Email"
                marginStyle={{ margin: 0 }}
                containerStyle={{ width: width < 1400 ? '347px' : '572px' }}
                type="email"
              />

              <Input
                name="CNPJ"
                placeholder="Insira o CNPJ da unidade"
                label="CNPJ"
                containerStyle={{ width: width < 1400 ? '347px' : '572px' }}
                marginStyle={{ margin: 0 }}
              />
            </FormGroup>

            <FormGroup>
              <Input
                name="storeId"
                placeholder="ID da loja"
                label="ID"
                marginStyle={{ margin: 0 }}
                containerStyle={{ width: width < 1400 ? '150px' : '296px' }}
              />

              <Input
                name="phone"
                placeholder="Insira o telefone da unidade"
                label="Telefone"
                marginStyle={{ margin: 0 }}
                containerStyle={{ width: width < 1400 ? '200px' : '255px' }}
              />

              <Input
                name="yoogaUrl"
                placeholder="Insira o link do yooga da unidade"
                label="Link Yooga"
                marginStyle={{ margin: 0 }}
                containerStyle={{ width: width < 1400 ? '320px' : '570px' }}
                type="url"
              />
            </FormGroup>
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
                'Confirmar'
              )}
            </ConfirmButton>
            <BackButton onClick={() => push('/Units')}>Voltar</BackButton>
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
