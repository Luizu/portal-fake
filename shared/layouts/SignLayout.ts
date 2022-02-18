import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

export const Content = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled(motion.img)`
  width: 396px;
  height: 396px;
`;
