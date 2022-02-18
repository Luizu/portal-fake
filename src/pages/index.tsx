import React, { useRef, useContext, useState } from 'react';
import Link from 'next/link';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AnimatePresence } from 'framer-motion';

import { toast } from 'react-toastify';
import Loading from 'react-loading';
import { useRouter } from 'next/router';
import { Input } from '../components/Input';
import { withSSRGuest } from '../utils/withSSRGuest';
import { AuthContext } from '../contexts/AuthContext';

import {
  Container,
  LoginContainer,
  LoginTitle,
  LoginForm,
  ButtonsContainer,
  LoginButton,
  TextButton,
  TextButtonBox,
  Logo,
} from '../../shared/pages/SignIn.styles';
import { getValidationErrors } from '../utils/getValidationErrors';

interface ILoginProps {
  login: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useContext(AuthContext);
  const { asPath } = useRouter();

  const handleSubmit = async (data: ILoginProps) => {
    try {
      setIsSigningIn(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        login: Yup.string().required('Email/Nome de usuário obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn(data);
    } catch (err) {
      setIsSigningIn(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }
      toast.error(
        'Vish, acho que alguem puxou um cabo aqui. tente novamente em uns minutinhos beleza?',
      );
    }
  };

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        <LoginContainer
          key={`form-${asPath}`}
          initial={{ opacity: 0, transform: 'translateX(-80px)' }}
          animate={{
            opacity: 1,
            transform: 'translateX(0px)',
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transform: 'translateX(-80px)',
            transition: {
              duration: 1,
            },
          }}
        >
          <LoginTitle>Login</LoginTitle>
          <LoginForm onSubmit={handleSubmit} ref={formRef}>
            <Input
              name="login"
              label="Login"
              containerStyle={{ width: '411px' }}
            />
            <Input
              name="password"
              label="Senha"
              type="password"
              containerStyle={{ width: '411px' }}
            />

            <ButtonsContainer>
              <TextButtonBox>
                <Link href="/Forgot" passHref>
                  <TextButton>Esqueci minha senha</TextButton>
                </Link>
                <Link href="/Register" passHref>
                  <TextButton>Não tenho cadastro</TextButton>
                </Link>
              </TextButtonBox>

              <LoginButton type="submit" isSigningIn={isSigningIn}>
                {isSigningIn ? (
                  <Loading
                    type="spinningBubbles"
                    height="24px"
                    width="24px"
                    color="var(--gray900)"
                  />
                ) : (
                  'Entrar'
                )}
              </LoginButton>
            </ButtonsContainer>
          </LoginForm>
        </LoginContainer>
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        <Logo
          src="assets/HashtagLogo.webp"
          key={`logo-${asPath}`}
          initial={{ opacity: 0, transform: 'translateX(80px)' }}
          animate={{
            opacity: 1,
            transform: 'translateX(0px)',
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transform: 'translateX(80px)',
            transition: {
              duration: 1,
            },
          }}
        />
      </AnimatePresence>
    </Container>
  );
}

// eslint-disable-next-line
export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {},
  };
});
