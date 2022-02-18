import {
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { Container, Label, InputContainer, Inputbase } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  isErrored?: boolean;
}

export function TextArea({
  name,
  label,
  isErrored,
  ...rest
}: TextAreaProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!textareaRef.current?.value);
  }, []);

  return (
    <Container>
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <InputContainer>
        <Inputbase
          name={name}
          {...rest}
          isErrored={!!error || isErrored}
          isFilled={isFilled}
          defaultValue={defaultValue}
          ref={textareaRef}
          onBlur={handleInputBlur}
        />
      </InputContainer>
    </Container>
  );
}
