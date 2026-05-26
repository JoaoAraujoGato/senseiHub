import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgb(255, 255, 255);
    /* background-color: #242424; */

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    --primary-color: #C53A2C;
    --primary-hover: rgba(199, 37, 37, 0.523);
    --background-color: #0B1218;
    --text-color: #ffffff;
    --button-text: #FFFFFF;
  }

  body {
    /*background-color: #1f2830; /* Cor ideal para os modulos */
    background-color: #0c131a; /* Cor ideal para o fundo */
    color: var(--text-color);
    margin: 0;
    padding: 0;
  }
`