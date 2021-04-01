import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .prevent-transitions * {
    transition: none !important;
  }
`
