import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding: 0;
  }

  html {
    font-size: 10px;

    @media (max-width: 800px) {
      // font-size: 8px;
    }
  }
  
  body {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // min-height: 100vh;

    font-family: "Inter", "Roobert", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.3rem;
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
    // font-family: 'Ubuntu', sans-serif;
    font-family: inherit;
    font-weight: 700;
    border: none;
    background: #e5e5e5;
    color: #1e1e1e;
    letter-spacing: 0.05em;
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
`