import { css, Global } from '@emotion/react';

export const media = {
  maxMobile: '@media(max-width:800px)',
  minlaptop: '@media(min-width: 800px)',
  laptop: '@media(min-width: 1000px)',
  desktop: '@media(min-width: 1400px)',
  large: '@media(min-width: 1600px)',
  normal: '@media(max-width:1440px)',
  notebook: '@media(max-width:1024px)',
};

export const globalStyles = (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
      }
      @media (max-width: 1080px) {
        html {
          font-size: 93.75%;
        }
      }
      @media (max-width: 720px) {
        html {
          font-size: 87.5%;
        }
      }

      html,
      body {
        height: 100%;
      }

      body {
        background-color: var(--gray800);
        overflow-x: hidden;
        overflow-y: scroll;
      }
      body,
      input,
      button {
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        color: var(--gray50);
      }
      button {
        cursor: pointer;
      }

      body::-webkit-scrollbar {
        width: 4px; /* width of the entire scrollbar */
      }

      body::-webkit-scrollbar-track {
        background: #222222; /* color of the tracking area */
      }

      body::-webkit-scrollbar-thumb {
        background-color: #7e7e7e; /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
      }

      @keyframes grow {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }

      :root {
        --gray50: #f7f7f7;
        --gray100: #e1e1e1;
        --gray200: #cfcfcf;
        --gray250: #c4c4c4;
        --gray300: #b1b1b1;
        --gray350: #b3b3b3;
        --gray380: #a0a0a0;
        --gray400: #9e9e9e;
        --gray500: #7e7e7e;
        --gray550: #7f7f7f;
        --gray600: #626262;
        --gray700: #515151;
        --gray800: #3b3b3b;
        --gray900: #222222;

        --yellow500: #ffc107;

        --red500: #c62828;
      }
    `}
  />
);
