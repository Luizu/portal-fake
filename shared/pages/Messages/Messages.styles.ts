import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { media } from '../../styles';

interface ITabProps {
  isActive?: boolean;
}

export const Container = styled.section`
  display: flex;
  flex: 1;

  justify-content: space-between;

  padding: 32px 0;
`;

export const Main = styled.main`
  display: flex;
  width: 100%;

  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 88px 0 64px;
`;

export const ContentPart = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray500);
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 24px;

  width: 216px;
  height: 48px;

  background: var(--gray900);

  border-radius: 7px;
`;

export const Tab = styled.div<ITabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray700);
  font-weight: 600;
  cursor: pointer;

  width: 50%;
  height: 100%;
  border-radius: 7px;

  ${props =>
    props.isActive &&
    css`
      background: var(--gray700);
      color: var(--gray50);
      cursor: not-allowed;
    `}
`;

export const List = styled.div`
  margin-top: 62px;
  width: 72%;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 24px 0 64px;
`;

export const IconsBox = styled.div`
  display: flex;
  gap: 16px;

  svg {
    cursor: pointer;

    &:hover {
      color: var(--yellow500);
      transition: 0.2s;
    }
  }

  .bin {
    color: var(--yellow500);

    &:hover {
      color: var(--red500);
      transition: 0.2s;
    }
  }
`;

export const ListTitle = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray50);
`;

export const ListBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  margin: 16px 0;
  padding-left: 40px;

  gap: 16px;

  ${media.desktop} {
    height: 55vh;
  }
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  width: 100%;
  height: 42px;

  ${media.desktop} {
    height: 48px;
  }

  background: var(--gray700);

  svg {
    display: none;
    transition: 0.2s;
  }

  &:hover {
    svg {
      display: initial;
      color: var(--gray350);
      cursor: pointer;
      margin-left: auto;
      margin-right: 24px;
      z-index: 20;

      &:hover {
        color: var(--red500);
      }
    }
  }
`;

export const ItemCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0 16px;
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ItemTitle = styled.h1`
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.3rem;

  color: var(--gray50);

  width: 28%;

  ${media.desktop} {
    width: 32%;
  }
`;

export const ItemText = styled.p`
  margin-left: 1rem;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3rem;
  color: var(--gray350);
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8%;
`;

export const Aside = styled.aside`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Button = styled.button`
  width: 218px;
  height: 48px;

  background: #ffc107;
  border-radius: 7px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray900);
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const ErrorText = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  color: var(--gray50);
`;
