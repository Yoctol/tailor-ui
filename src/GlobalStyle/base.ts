import { rem } from 'polished';

import theme from '../theme';
import { css } from '../utils/styled-components';

const { colors } = theme;

export default css`
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
    background: ${colors.light};
    color: ${colors.gray700};
    font-family: Roboto, 'PingFang TC', 'Microsoft JhengHei', 'Helvetica Neue',
      sans-serif;
    font-size: ${rem('14px')};
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${colors.info};
    text-decoration: none;
    cursor: pointer;
  }
`;
