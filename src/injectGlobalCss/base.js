import { css } from 'styled-components';

import * as colors from '../theme/colors';
import { controlShadow } from '../utils/shadow';

export default css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 20px;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    overflow-x: hidden;
    background: ${colors.light};
    color: ${colors.gray[2]};
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
      'PingFang TC', 'Microsoft JhengHei', Roboto, 'Helvetica Neue', sans-serif;
    font-size: 0.7rem;
    text-rendering: optimizeLegibility;
  }

  a {
    outline: none;
    color: ${colors.primary};
    text-decoration: none;

    &:focus {
      ${controlShadow(colors.primary)};
    }

    &:focus,
    &:hover,
    &:active,
    &.active {
      color: ${colors.primaryDark};
      text-decoration: underline;
    }
  }
`;
