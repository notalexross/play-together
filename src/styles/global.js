import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin:0;
    padding: 0;
  }

  html {
    font-size: 10px;
  }
  
  body {
    background-color: #1e1e1e;
    color: #e5e5e5;
    font-family: "Inter", "Roobert", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.3rem;
  }
  
  a {
    color: #333;
    text-decoration: none;
  }

  button {
    margin-top: 1rem;
    padding: 0.8em 1.2em;
    background-color: #e5e5e5;
    color: #1e1e1e;
    border: none;
    font-family: inherit;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    user-select: none;
  }

  button:active {
    background-color: white;
  }

  button:hover {
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.3;
  }

  .scrollbox {
    overflow: auto;
    background:
      /* Shadow covers */
      linear-gradient(var(--bg-color) 30%, #00000000),
      linear-gradient(#00000000, var(--bg-color) 70%) 0 100%,
      /* Shadows */
      radial-gradient(farthest-side at 50% 0, var(--shadow-color), #00000000),
      radial-gradient(farthest-side at 50% 100%, var(--shadow-color), #00000000) 0 100%;
    background-repeat: no-repeat;
    background-color: var(--bg-color);
    background-size:
      100% 30px,
      100% 30px,
      100% 14px,
      100% 14px;
    background-attachment:
      local,
      local,
      scroll,
      scroll;
  }

  /* scrollbar - adapted from https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border: solid 1px rgba(255,255,255,0.4);
    border-radius: 10px;
    background-color: rgba(0,0,0,0.4);
  }
`
