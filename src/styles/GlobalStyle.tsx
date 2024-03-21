import { css, Global } from "@emotion/react";

const style = css`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  a {
    font-weight: 500;
    color: #4952ff;
    text-decoration: inherit;
  }
  a:hover {
    color: #858bff;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    box-sizing: border-box;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  ul {
    list-style: none;
  }
`;

function GlobalStyle() {
  return <Global styles={style} />;
}

export default GlobalStyle;
