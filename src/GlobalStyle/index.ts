import styledNormalize from 'styled-normalize';
import { rem } from 'polished';

import { createGlobalStyle } from 'utils/styled-components';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    overflow-x: hidden;
    background: ${p => p.theme.colors.light};
    color: ${p => p.theme.colors.gray700};
    font-family: Roboto, 'PingFang TC', 'Microsoft JhengHei', 'Helvetica Neue',
      sans-serif;
    font-size: ${rem('14px')};
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${p => p.theme.colors.info};
    text-decoration: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
