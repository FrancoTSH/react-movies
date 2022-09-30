import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { media } from "styles/helpers/mixins";

export default createGlobalStyle`

  ${normalize}

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    overflow-x: hidden;
    font-family: sans-serif;
    font-size: 1.5rem;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  p {
    line-height: 1.9rem;
  }

  h1 {
    font-size: 4.8rem;
  }

  h2 {
    font-size: 3.4rem;
  }
`;

export const Container = styled.div`
  width: 90%;
  max-width: 975px;
  margin: 0 auto;
  overflow: hidden;

  ${media.lg`
    max-width: 880px;
  `}
`;
