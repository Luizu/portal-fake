import styled from '@emotion/styled';
import { Form as unform } from '@unform/web';

export const Container = styled(unform)`
  display: flex;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 40px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: #7e7e7e;

  padding: 0 24px;
`;

export const Aside = styled.aside`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px 64px 0 0;
`;

export const ButtonsBox = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

export const ConfirmButton = styled.button`
  width: 218px;
  height: 48px;

  background: var(--yellow500);
  border-radius: 7px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray900);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 218px;
  height: 48px;

  background: var(--gray900);
  border-radius: 7px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray300);

  &:hover {
    color: var(--yellow500);
    border: 2px solid var(--yellow500);
  }
`;

export const MeContainer = styled.div``;

export const MeHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 54px 0 0 24px;
  gap: 40px;
`;

export const MeAvatar = styled.label`
  width: 220px;
  height: 220px;
  position: relative;

  input {
    display: none;
  }
`;

export const AvatarIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gray900);

  cursor: pointer;
  svg {
    color: #7e7e7e;
  }

  position: absolute;
  bottom: 0;
  right: 0;

  &:hover {
    filter: brightness(1.2);

    svg {
      color: var(--yellow500);
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 0 24px;
  gap: 8px;
`;

export const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: var(--gray50);
`;

export const ProfileText = styled.p`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: left;

  color: #7e7e7e;
`;

export const ProfileDivisor = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;

  background: var(--gray500);

  margin: 0 14px;
`;

export const MeForm = styled.div`
  display: flex;
  width: 100%;

  gap: 24px;
  margin-top: 70px;
`;

export const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
