import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Label, InputContainer, Inputbase, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  marginStyle?: object;
  containerStyle?: object;
  label?: string;
}

export function Input({
  name,
  label,
  marginStyle = {},
  containerStyle = {},
  ...rest
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container style={marginStyle}>
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <InputContainer style={containerStyle}>
        <Inputbase
          name={name}
          {...rest}
          isErrored={!!error}
          isFilled={isFilled}
          defaultValue={defaultValue}
          ref={inputRef}
          onBlur={handleInputBlur}
          style={containerStyle}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </InputContainer>
    </Container>
  );
}
