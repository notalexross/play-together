import { createGlobalStyle } from 'styled-components'

export const PreventTransitions = createGlobalStyle`
  .prevent-transitions * {
    transition: none !important;
  }
`
