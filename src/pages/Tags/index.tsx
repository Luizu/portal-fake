import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useWindowWidth } from '@react-hook/window-size';
import Loading from 'react-loading';
import {
  IoAddOutline,
  IoRefreshOutline,
  IoTrashOutline,
} from 'react-icons/io5';

// Api
import { withSSRAuth } from '../../utils/withSSRAuth';
import { useTags } from '../../services/hooks/useTags';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';

// Components
import { AppLayout } from '../../layouts/AppLayout';
import { Pagination } from '../../components/Pagination';
import { TagSkeleton } from '../../components/TagSkeleton/Index';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';

import {
  Container,
  Title,
  Header,
  ContentPart,
  Tabs,
  Tab,
  Button,
  Content,
  ContentHeader,
  ContentTitle,
  IconsBox,
  TagsList,
  TagItem,
  Checkbox,
  TagText,
  TagName,
  TagId,
  Error,
  ErrorText,
  ModalBackground,
  Modal,
  ModalTitle,
  ModalContent,
  ButtonsBox,
  BackButton,
  SubmitButton,
  ListContainer,
} from '../../../shared/pages/Tags.styles';

interface IFormProps {
  name: string;
}

export default function Messages() {
  const formRef = useRef<FormHandles>(null);
  const width = useWindowWidth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(9);
  const [trio, setTrio] = useState('NGJ');
  const [type, setType] = useState('chat');

  const { data, isFetching, isLoading, error, refetch } = useTags(page, take);

  useEffect(() => {
    (async () => {
      if (width < 1440) {
        setTake(9);
      } else if (width < 1600) {
        setPage(1);
        setTake(24);
      } else {
        setPage(1);
        setTake(32);
      }
    })();
  }, [width]);

  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries('tag');
      await refetch();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take]);

  const handleCheckChange = (id: string) => {
    const checkIfIdIsSelected = selected.find(item => item === id);

    if (checkIfIdIsSelected) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = async (formData: IFormProps, { reset }) => {
    try {
      setIsSubmitting(true);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await api.post('/tag', { ...formData, trio, type });
      refetch();
      toast.success('Tag criada com sucesso!');
      setIsModalOpen(false);
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      if (err.response.data) {
        switch (err.response.data.message) {
          case 'Tag already exists':
            toast.error('Nome de Tag já em uso, substitua e tente novamente');
            break;

          default:
            toast.error('Erro ao cadastrar nova tag, tente novamente');
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const ids = { ids: selected };

      await api.delete(`/tag`, {
        data: ids,
      });
      refetch();
      toast.success('Tag excluída com sucesso!');
    } catch (err) {
      if (err.response.data) {
        switch (err.response.data.message) {
          case 'Tag not found':
            toast.error('Tag não encontrada, tente novamente');
            break;

          default:
            toast.error('Erro ao excluir tag, tente novamente');
            // eslint-disable-next-line
            console.log(err.response.data?.message);
            break;
        }
      }
    }
  };
  return (
    <>
      <AppLayout page="Tags">
        <Container>
          <Header>
            <ContentPart>
              <Title>Tags</Title>

              <Tabs>
                <Tab isActive={!isActive} onClick={() => setIsActive(true)}>
                  Ativa.
                </Tab>
                <Tab isActive={isActive} onClick={() => setIsActive(true)}>
                  Fluxo
                </Tab>
              </Tabs>
            </ContentPart>

            <Button onClick={() => setIsModalOpen(true)}>
              <IoAddOutline size={24} />
              Nova Tag
            </Button>
          </Header>

          <Content>
            <ContentHeader>
              <ContentTitle>Ativação</ContentTitle>
              <IconsBox>
                <IoRefreshOutline size={24} onClick={() => refetch()} />
                {selected.length !== 0 && (
                  <IoTrashOutline
                    size={24}
                    className="bin"
                    onClick={handleDelete}
                  />
                )}
              </IconsBox>
            </ContentHeader>

            {isLoading || isFetching ? (
              <TagsList>
                <TagSkeleton repeats={take} />
              </TagsList>
            ) : error ? (
              <Error>
                <ErrorText>
                  Ops! Algo de errado aconteceu, por favor, tente novamente
                </ErrorText>
              </Error>
            ) : data.tags.length === 0 ? (
              <Error>
                <ErrorText>Nenhuma mensagem encontrada no sistema!</ErrorText>
              </Error>
            ) : (
              <>
                <ListContainer>
                  <TagsList>
                    {data.tags.map(tag => (
                      <TagItem key={tag.id}>
                        <Checkbox
                          type="checkbox"
                          onChange={() => handleCheckChange(tag.id)}
                          checked={selected.includes(tag.id)}
                        />
                        <TagText>
                          <TagName>{tag.name}</TagName>
                          <TagId>{tag.internId}</TagId>
                        </TagText>
                      </TagItem>
                    ))}
                  </TagsList>
                </ListContainer>
                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  registerPerPage={take}
                  onPageChange={setPage}
                  currentPage={page}
                />
              </>
            )}
          </Content>
        </Container>
      </AppLayout>

      <ModalBackground isOpen={isModalOpen}>
        <Modal>
          <ModalTitle>Nova Tag</ModalTitle>
          <ModalContent onSubmit={handleSubmit} ref={formRef}>
            <Input
              name="name"
              label="Nome"
              containerStyle={{ width: '308px' }}
            />
            <Select
              name="trio"
              label="Trio"
              containerStyle={{ width: '308px' }}
              onChange={e => setTrio(e.target.value)}
            >
              <option value="NGJ">NGJ</option>
              <option value="FUA">FUA</option>
            </Select>

            <Select
              name="type"
              label="Tipo"
              containerStyle={{ width: '308px' }}
              onChange={e => setType(e.target.value)}
            >
              <option value="chat">FLuxo de Atendimento</option>
              <option value="activation">Mensagem de Ativação</option>
            </Select>

            <ButtonsBox>
              <BackButton onClick={() => setIsModalOpen(false)}>
                Voltar
              </BackButton>
              <SubmitButton type="submit">
                {isSubmitting ? (
                  <Loading
                    type="spinningBubbles"
                    height="24px"
                    width="10%"
                    color="var(--gray900)"
                  />
                ) : (
                  'Salvar'
                )}
              </SubmitButton>
            </ButtonsBox>
          </ModalContent>
        </Modal>
      </ModalBackground>
    </>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
