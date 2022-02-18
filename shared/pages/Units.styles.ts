import styled from '@emotion/styled';
import { media } from '../styles';

interface SessionState {
  isOnline: boolean;
}

interface Text {
  isContacts?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 22px 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding-right: 54px;

  ${media.desktop} {
    padding-right: 48px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 72%;

  ${media.desktop} {
    justify-content: initial;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  margin-left: 24px;

  color: var(--gray500);
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;

  width: 430px;
  height: 48px;

  border: 3px solid var(--gray500);
  border-radius: 8px;

  padding: 0 24px;

  svg {
    color: #7e7e7e;
  }
  ${media.laptop} {
    margin-left: 20px;
  }

  ${media.desktop} {
    margin-left: 80px;

    width: 460px;
    height: 48px;
  }

  ${media.large} {
    margin-left: 140px;

    width: 700px;
    height: 48px;
  }
`;

export const Search = styled.input`
  background: transparent;

  height: 48px;

  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0 16px;

  color: var(--gray200);
`;

export const CreateButton = styled.button`
  width: 218px;
  height: 48px;

  background: #ffc107;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  text-align: center;

  color: var(--gray900);

  &:hover {
    filter: brightness(0.8);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 74%;

  margin-top: 48px;

  ${media.desktop} {
    margin-top: 80px;
  }

  ${media.large} {
    margin-top: 60px;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0 24px;

  svg {
    cursor: pointer;

    &:hover {
      color: var(--yellow500);
      transition: 0.2s;
    }
  }

  ${media.desktop} {
    padding: 0 8px;
  }
`;

export const ListContainer = styled.div`
  height: 43vh;
  margin-bottom: 16px;

  ${media.desktop} {
    height: 60vh;
  }
`;

export const List = styled.div`
  margin-top: 20px;

  display: flex;
  flex-wrap: wrap;

  gap: 24px;
  margin-bottom: 24px;
`;

export const Unit = styled.span`
  display: flex;
  flex-direction: column;

  cursor: pointer;

  background: #515151;
  border-radius: 8px;

  width: 320px;
  height: 111px;

  &:hover {
    filter: brightness(1.2);
  }

  /* ${media.desktop} {
    width: 256px;
    height: 60px;
  }

  ${media.large} {
    width: 275px;
    height: 60px;
  } */
`;

export const UnitTitleBox = styled.div`
  display: flex;
  align-items: center;

  height: 37px;
  border-radius: 8px 8px 0 0;

  background: var(--gray900);
  padding: 0 16px;
  gap: 10px;
`;

export const UnitTrio = styled.h1`
  font-size: 0.8rem;
  font-weight: 600;

  color: var(--yellow500);
`;

export const UnitTitle = styled.h1`
  font-weight: 600;

  font-size: 0.8rem;

  color: #ffffff;

  ${media.desktop} {
    font-size: 0.875rem;
    line-height: 1.3rem;
  }
`;

export const UnitInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 28px;
`;

export const UnitInfoContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 11px;

  justify-content: space-between;
`;

export const ContactsBox = styled.div`
  display: flex;
  gap: 40px;
`;

export const UnitInfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  svg {
    color: var(--gray200);
  }
`;

export const SessionIndicator = styled.div<SessionState>`
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: ${props => (props.isOnline ? '#16C142' : '#C62828')};
`;

export const UnitInfoText = styled.p<Text>`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3rem;

  color: ${props => (props.isContacts ? 'var(--gray500)' : 'var(--gray200)')};
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;

export const ErrorText = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  color: var(--gray50);
`;
