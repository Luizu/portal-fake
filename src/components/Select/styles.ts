import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;

  & + & {
    margin-top: 1rem;
  }
`;

export const Label = styled.label`
  color: var(--gray600);
  margin: 0 0 1rem 1.5rem;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 118px;
  background: var(--gray900);
`;

export const Inputbase = styled.select`
  width: 118px;
  height: 56px;
  border: none;
  padding: 16px;

  background: var(--gray900);

  &:hover,
  &:focus {
    border: 2px solid #ffc107;
  }

  option {
    color: var(--gray600);
    padding: 16px;
  }
`;
