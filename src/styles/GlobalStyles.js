//currently a bug with the liner-gradient not displaying from the
//top of the page on an iphone with a integrated notch


import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --blue: rgb(0, 151, 213);
  }
  * {
    box-sizing: border-box !important;
  }
  body {
    background: var(--blue);
    /* background: linear-gradient(180deg, rgba(0, 151, 213, 1) 0%, rgba(255, 255, 255, 1) 75%); */
    height: 100vh;
    overflow: none;
  }
  input {
    font-size: 16px !important;
  }
`;

export default GlobalStyles;