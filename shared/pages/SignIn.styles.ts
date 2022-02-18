import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form as unform } from '@unform/web';
import { motion } from 'framer-motion';

import { shade } from 'polished';

interface SignInProps {
  isSigningIn: boolean;
}

export const Container = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const LoginContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginTitle = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 3rem;

  color: #b1b1b1;

  margin-bottom: 1rem;
`;

export const LoginForm = styled(unform)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 56px;
`;

export const TextButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const TextButton = styled.p`
  font-size: 0.75rem;
  line-height: 1.12rem;
  cursor: pointer;

  color: var(--gray550);

  &:hover {
    color: var(--gray300);
    border-bottom: 2px solid var(--gray300);
  }
`;

export const LoginButton = styled.button<SignInProps>`
  width: 218px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--yellow500);
  color: var(--gray900);

  border: none;
  border-radius: 7px;

  &:hover {
    border: 4px solid #f7f7f7;
    background: ${shade(0.2, '#ffc107')};
  }

  transition: width 1s, height 1s, border-radius 1s, background-color 0.2s;

  ${props =>
    props.isSigningIn &&
    css`
      width: 50px;
      height: 48px;
      border-radius: 50%;
    `}
`;

export const Logo = styled(motion.img)`
  width: 396px;
  height: 396px;
`;
