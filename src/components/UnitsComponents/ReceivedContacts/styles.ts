import styled from '@emotion/styled';
import { media } from '../../../../shared/styles';
import { Tooltip } from '../../Input/Tooltip';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  padding: 0 0 16px 24px;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;

  color: var(--gray700);
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 24px;
  gap: 1rem;

  border-radius: 24px;
  height: 134px;

  width: 300px;

  ${media.desktop} {
    width: 401px;
    gap: 32px;
  }

  background: var(--gray900);
`;

export const VerticalBox = styled.div`
  display: flex;
  gap: 124px;
  /* margin-top: -20px; */
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  width: 60px;

  svg {
    color: var(--yellow500);
  }
`;

export const InfoText = styled.p`
  font-weight: 600;
  font-size: 1rem;

  color: var(--gray400);
`;

export const TotalText = styled.h1`
  font-family: Poppins;
  font-weight: 600;
  font-size: 32px;
  color: #ffc107;
`;

export const HoverInfo = styled(Tooltip)`
  /* width: 0; */
  /* height: 20px; */
  /* padding: 0 16px; */
  svg {
    margin: 0;
  }
  span {
    background: var(--yellow500);
    color: var(--gray900);
    &::before {
      border-color: var(--yellow500) transparent;
    }
  }
`;
