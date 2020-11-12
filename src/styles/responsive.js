import { createGlobalStyle } from 'styled-components';
import { Text as HeaderText } from '../components/header/styles'
import { Wrapper as PanelWrapper } from '../components/panel/styles'

export const ResponsiveStyle = createGlobalStyle`

  header {
    .header-copy-link-symbol {
      display: none;
    }

    @media (max-width: 800px) {
      flex-direction: column;

      ${HeaderText} {
        margin-top: 0.5em;
      }

      .header-copy-link-text {
        display: none;
      }

      .header-copy-link-symbol {
        display: grid;
      }
    }
  }

  @media (max-width: 1200px) and (min-width: 800px) {
    .settings {
      &${PanelWrapper} {
        height: min-content;
        position: absolute;
        z-index: 1;
      }
    }
  }

  @media (max-width: 800px) {
    // .room {
    //   flex-direction: column;
    // }

    .settings,
    .chat {
      &${PanelWrapper} {
        hidden: true;
        width: 0;
        overflow: hidden;
      }
    }
  }
`