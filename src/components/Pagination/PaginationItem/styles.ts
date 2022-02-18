import styled from '@emotion/styled';

export const Container = styled.button`
  width: 36px;
  height: 36px;
  background: var(--gray700);

  border-radius: 8px;

  &:hover {
    background: var(--gray500);
  }

  &:disabled {
    cursor: default;
    color: #ffc107;
    font-weight: bold;
  }
`;
