import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding: 0;
  }
  
  body {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // min-height: 100vh;

    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    // background-color: #1e1e1e;
    color: #e5e5e5;
  }
  
  a {
    color: #333;
    text-decoration: none;
  }
  
  // #root {
  //   background: #252525;
  //   padding: 2rem;
  // }
  
  button {
    margin-top: 1rem;
    padding: 0.8em 1.2em;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 700;
    border: none;
    background: #e5e5e5;
    color: #1e1e1e;
  }

  button:active {
    background: white;
  }

  button:hover {
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.3;
  }
`;