import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';

import datePickerStyles from '../DatePicker/styles';
import { ThemeType } from '../theme';

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
    background: ${(p: { theme: ThemeType }) => p.theme.colors.light};
    color: ${(p: { theme: ThemeType }) => p.theme.colors.gray700};
    font-family: Roboto, 'PingFang TC', 'Microsoft JhengHei', 'Helvetica Neue',
      sans-serif;
    font-size: ${rem('16px')};
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${(p: { theme: ThemeType }) => p.theme.colors.info};
    text-decoration: none;
    cursor: pointer;
  }

  svg {
    pointer-events: none;
  }

  ${datePickerStyles}
`;

export default GlobalStyle;
