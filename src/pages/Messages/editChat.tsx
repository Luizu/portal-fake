import { IoAddOutline } from 'react-icons/io5';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useRef, useState } from 'react';
import { Switch } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AppLayout } from '../../layouts/AppLayout';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupAPIClient } from '../../services/api';

import { Message } from '../../components/ChatComponents/Message';
import { queryClient } from '../../services/queryClient';
import { Input } from '../../components/Input';
import { getValidationErrors } from '../../utils/getValidationErrors';

import {
  Container,
  Content,
  Header,
  Aside,
  Title,
  MessagesContainer,
  NewMessage,
  TagBox,
  TagInput,
  Tag,
  TagCreate,
  TagList,
  DeleteButton,
  BackButton,
  SaveButton,
  ModalBackground,
  Modal,
  ModalTitle,
  ModalBody,
  ModalButtons,
  ModalBack,
  ModalSave,
  Label,
  TagBackButton,
  TagButtonsBox,
  TagModal,
  TagModalContent,
  TagModalTitle,
  TagSubmitButton,
  TagModalBackground,
} from '../../../shared/pages/Messages/Chat.styles';
import { Select } from '../../components/Select';

interface SSRReturn {
  chat: IChatProps;
}

interface IChatProps {
  id: string;
  name: string;
  messages: IMessageProps[];
  Tag: ITagProps;
}

interface IMessageProps {
  id: string;
  position: number;
  body: string;
}

interface ITagProps {
  id: string;
  name: string;
}

interface IFormProps {
  name: string;
}

export default function EditChat({ chat }: SSRReturn) {
  const { push } = useRouter();
  const formRef = useRef<FormHandles>(null);
  const api = setupAPIClient();

  // Tags
  const [tags, setTags] = useState<ITagProps[]>([]);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [searchedTags, setSearchedTags] = useState<ITagProps[]>([]);
  const [selectedTag, setSelectedTag] = useState<ITagProps>(chat?.Tag);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [trio, setTrio] = useState<string>('NGJ');

  // Chats
  const [workflow, setWorkflow] = useState<IChatProps>(chat);
  const [title, setTitle] = useState<string>('Novo Fluxo');
  const [body, setBody] = useState<string>();
  const [isDragDisabled, setIsDragDisabled] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessageProps[]>(chat?.messages);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState<boolean>(false);

  useEffect(() => {
    api.get('/tag').then(res => {
      setTags(res.data.tags);
    });
  }, [api]);

  useEffect(() => {
    if (workflow) {
      setTitle(workflow.name);
      setMessages(workflow.messages);
    }
  }, [workflow]);

  const changePositions = (items: IMessageProps[]) => {
    const newItems = items.map((item, index) => {
      return {
        ...item,
        position: index + 1,
      };
    });

    return newItems;
  };

  async function handleOnDragEnd(result) {
    try {
      if (!result.destination) return;

      if (result.destination.index === result.source.index) return;

      const items = Array.from(messages);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      const newItems = changePositions(items);

      await api.put(`/chat/${workflow.id}`, {
        messages: newItems,
      });

      setMessages(newItems);
      toast.success('Mensagens reordenadas com sucesso!');
    } catch (err) {
      toast.error('Erro ao reordenar mensagens');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  const handleSwitch = () => {
    setIsDragDisabled(!isDragDisabled);
  };

  // on change, return all similar items from tags
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > 0) {
      setIsFilled(true);
      const filteredTags = tags.filter(tag => {
        return tag.name.toLowerCase().includes(value.toLowerCase());
      });
      setSearchedTags(filteredTags);
      setSearchTerm(value);
      return;
    }
    setIsFilled(false);
    setSearchTerm('');
    e.target.value = '';
  };

  const handleTagSelect = (id: string) => {
    const tag = tags.find(t => t.id === id);
    setSelectedTag(tag);
    setIsFilled(false);
    setSearchedTags([]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleSave = async () => {
    try {
      if (!selectedTag) {
        toast.error('É necessário inserir uma tag antes de Salvar!');
        return;
      }

      const { data } = await api.post('/chat', {
        name: title,
        tagId: selectedTag.id,
      });

      setWorkflow(data);
      toast.success('Fluxo criado com sucesso');
      await queryClient.invalidateQueries('chat');
    } catch (err) {
      toast.error('Erro ao salvar');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleModalOpen = () => {
    if (!workflow) {
      toast.error('Necessário criar um fluxo antes de adicionar uma mensagem!');
      return;
    }
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/chat/${workflow.id}`);
      toast.success('Fluxo deletado com sucesso');
      push('/Messages');
    } catch (err) {
      toast.error('Erro ao deletar');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleNewMessage = async () => {
    try {
      if (!body) {
        toast.error('Digite uma mensagem antes de salvar');
        return;
      }

      const { data } = await api.post('/chat/message', {
        chatId: workflow.id,
        body,
        position: messages.length + 1,
      });

      const newMessages = [...messages, data];
      setMessages(newMessages);
      setBody('');
      setIsModalOpen(false);
      toast.success('Mensagem criada com sucesso');
    } catch (err) {
      toast.error('Erro ao criar nova mensagem');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleSubmit = async (formData: IFormProps) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const newTag = await api.post('/tag', {
        ...formData,
        trio,
        type: 'chat',
      });

      setTags([...tags, newTag.data]);

      toast.success('Tag criada com sucesso!');
      setIsTagModalOpen(false);
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
    }
  };

  const handleEditMessage = (message: IMessageProps) => {
    if (!isDragDisabled) return;

    setIsModalOpen(true);
    setBody(message.body);
  };

  return (
    <>
      <AppLayout page={workflow?.name || title}>
        <Container>
          <Content>
            <Header>
              <Title
                placeholder="Novo Fluxo"
                defaultValue={workflow?.name || title}
                onChange={e => handleTitleChange(e)}
              />
              <Switch colorScheme="yellow" onChange={handleSwitch} checked />
            </Header>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable
                droppableId="messages"
                type="CARD"
                direction="horizontal"
                isCombineEnabled={false}
              >
                {provided => (
                  <>
                    <MessagesContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <NewMessage onClick={handleModalOpen}>
                        <IoAddOutline size={56} />
                      </NewMessage>
                      {messages?.map((message, index) => (
                        <Message
                          key={message.id}
                          id={message.id}
                          position={message.position}
                          body={message.body}
                          index={index}
                          isDragDisabled={isDragDisabled}
                          onEditRequest={handleEditMessage}
                        />
                      ))}
                    </MessagesContainer>
                    {provided.placeholder}
                  </>
                )}
              </Droppable>
            </DragDropContext>
          </Content>
          <Aside>
            <TagBox>
              <TagInput
                placeholder="Insira uma Tag"
                onChange={e => handleChange(e)}
                value={selectedTag?.name}
                disabled={!!selectedTag}
              />
              {isFilled && (
                <TagList>
                  {searchedTags?.map(tag => (
                    <Tag key={tag.id} onClick={() => handleTagSelect(tag.id)}>
                      {tag.name}
                    </Tag>
                  ))}
                  <TagCreate onClick={() => setIsTagModalOpen(true)}>
                    Criar Tag
                  </TagCreate>
                </TagList>
              )}
            </TagBox>

            {title !== 'Novo Fluxo' && title !== workflow?.name && (
              <SaveButton onClick={handleSave}>Salvar</SaveButton>
            )}

            {workflow && (
              <DeleteButton onClick={handleDelete}>Deletar</DeleteButton>
            )}

            <BackButton onClick={() => push('/Messages')}>Voltar</BackButton>
          </Aside>
        </Container>
      </AppLayout>

      <ModalBackground isOpen={isModalOpen}>
        <Modal>
          <ModalTitle>
            {messages ? `Mensagem ${messages.length + 1}` : 'Mensagem 1'}
          </ModalTitle>

          <Label htmlFor="body">Mensagem</Label>
          <ModalBody
            name="body"
            onChange={e => setBody(e.target.value)}
            defaultValue={body}
          />

          <ModalButtons>
            <ModalBack
              onClick={() => {
                setBody(' ');
                setIsModalOpen(false);
              }}
            >
              Voltar
            </ModalBack>
            <ModalSave onClick={handleNewMessage}>Salvar</ModalSave>
          </ModalButtons>
        </Modal>
      </ModalBackground>

      <TagModalBackground isOpen={isTagModalOpen}>
        <TagModal>
          <TagModalTitle>Nova Tag</TagModalTitle>
          <TagModalContent
            onSubmit={handleSubmit}
            ref={formRef}
            initialData={{
              name: searchTerm,
            }}
          >
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

            <TagButtonsBox>
              <TagBackButton onClick={() => setIsTagModalOpen(false)}>
                Voltar
              </TagBackButton>
              <TagSubmitButton type="submit">Salvar</TagSubmitButton>
            </TagButtonsBox>
          </TagModalContent>
        </TagModal>
      </TagModalBackground>
    </>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);
  let chat = null;

  const { id } = ctx.query;

  if (id) {
    const { data } = await apiClient.get(`/chat/byId/${id}`);

    chat = data;
  }

  return {
    props: { chat },
  };
});
