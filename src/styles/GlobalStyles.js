import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --blue: #0097d5;
    --blue-dark: #006a9e;
  }

  * {
    box-sizing: border-box !important;
  }

  body {
    background: linear-gradient(180deg, #e8f4f8 0%, #f8fafc 100%);
    min-height: 100vh;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }

  input {
    font-size: 16px !important;
  }

  /* Smooth transitions for interactive elements */
  button, input, .mantine-Card-root {
    transition: all 0.2s ease;
  }

  /* Better focus styles */
  *:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }
`;

export default GlobalStyles;
