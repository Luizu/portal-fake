import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { media } from '../../../../shared/styles';

interface IProfileProps {
  isOwner?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 280px;

  ${media.desktop} {
    width: 346px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 24px;

  svg {
    color: var(--gray700);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: var(--yellow500);
    }
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray700);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 24px;
  margin-top: 16px;

  width: 280px;
  height: 262px;

  background: var(--gray900);

  padding: 26px 24px;

  ${media.desktop} {
    width: 346px;
  }
`;

export const ContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-width: 280px;

  p {
    display: flex;
    gap: 5rem;

    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    color: var(--gray600);
  }
`;

export const Profile = styled.div<IProfileProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  svg {
    color: var(--gray600);
  }

  & + & {
    margin-top: 36px;
  }

  ${props =>
    props.isOwner &&
    css`
      margin-bottom: 41px;
      svg {
        color: var(--yellow500);
      }
    `}
`;

export const ProfileText = styled.p<IProfileProps>`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.312rem;

  color: var(--gray600);

  ${props =>
    props.isOwner &&
    css`
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5rem;

      color: var(--gray400);
    `}
`;
