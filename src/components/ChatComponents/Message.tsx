import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Body, Container, Position } from './styles';

interface IMessageProps {
  id: string;
  position: number;
  body: string;
  index: number;
  isDragDisabled: boolean;
  onEditRequest: (message) => void;
}

type Message = {
  id: string;
  position: number;
  body: string;
};

export function Message({
  id,
  body,
  position,
  index,
  isDragDisabled = true,
  onEditRequest,
}: IMessageProps) {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEditRequest({ id, body, position })}
        >
          <Position>{position}</Position>
          <Body> {body} </Body>
        </Container>
      )}
    </Draggable>
  );
}
