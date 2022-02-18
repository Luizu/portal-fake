import styled from '@emotion/styled';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 256px;
  /* min-height: 100vh; */
  /* height: 100%; */

  background: var(--gray900);
  border-right: 2px solid var(--gray700);
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;

  margin-top: 248px;
`;
