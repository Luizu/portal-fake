import styled from '@emotion/styled';
import { media } from '../../../shared/styles';

interface SessionState {
  isOnline: boolean;
}

export const Container = styled.div`
  /* width: auto; */
  display: flex;
  justify-content: left;
  padding-left: 20px;
  min-height: 55vh;

  ${media.laptop} {
    height: 55vh;
  }
  ${media.desktop} {
    height: 66vh;
  }
`;

export const Content = styled.div`
  width: 80vw;
  height: 66vh;
  min-height: 55vh;
  overflow-y: scroll;

  ${media.laptop} {
    height: 55vh;
  }
  ${media.desktop} {
    height: 66vh;
  }

  &::-webkit-scrollbar {
    width: 8px; /* width of the entire scrollbar */
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #222222; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7e7e7e; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }

  .resizer {
    display: inline-block;
    background-color: var(--gray600);
    width: 3px;
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;

    ${'' /* prevents from scrolling while dragging on touch devices */}
    touch-action:none;
    &:hover {
      background: #f7f7f7;
    }
    &.isResizing {
      background: #f7f7f7;
    }
  }
`;
export const Row = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 0;

  &:hover {
    color: var(--yellow500);
    filter: brightness(80%);
  }
`;
export const HeaderContent = styled.div`
  position: sticky;
  z-index: 1000;
  top: 0;
  position: -webkit-sticky;
`;

export const Body = styled.div`
  border-bottom: 2px solid #515151;
  height: 100%;
  padding: 10px;
  background-color: #222222;

  &:nth-of-type(even) {
    background-color: #2b2b2b;
  }

  //FONTS

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  :first-child {
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
`;
export const Head = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #626262;
  padding: 10px;
  height: 50px;

  :first-child {
    border-left: 0;
  }

  svg {
    position: absolute;
    right: 6px;
    cursor: pointer;
  }
  &:hover {
    color: #f7f7f7;
  }
`;
export const Headerow = styled.div`
  position: sticky;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #222222;
`;
export const BodyBox = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5px;
`;
export const BodyContent = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #222222;
  width: 100%;
  height: 100%;
`;

export const MainContent = styled.div`
  background-color: #222222;
  border: 2px solid #515151;
`;

export const Status = styled.div<SessionState>`
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: ${props => (props.isOnline ? '#16C142' : '#C62828')};

  margin: 0 auto;
`;

export const Button = styled.button`
  svg {
    cursor: pointer;
    color: var(--gray500);
    position: absolute;
    z-index: 1000000;
    top: 220px;
    right: 50px;
    font-size: 1.5rem;
    &:hover {
      color: #f7f7f7;
    }
    &:active {
      transform: rotate(90deg);
      transition: 0.2s;
    }
  }
`;
export const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
