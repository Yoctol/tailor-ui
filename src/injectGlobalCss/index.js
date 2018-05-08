import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

import * as colors from '../theme/colors';
import { controlShadow } from '../utils/shadow';

const injectGlobalCss = () => injectGlobal`
  ${styledNormalize}

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
    background: ${colors.bodyBg};
    color: ${colors.bodyFont};
    font-family: 'Helvetica Neue', Arial, sans-serif, 'PingFang TC', 'Microsoft JhengHei';
    font-size: 0.7rem;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${colors.link};
    outline: none;
    text-decoration: none;

    &:focus {
      ${controlShadow(colors.link)};
    }

    &:focus,
    &:hover,
    &:active,
    &.active {
      color: ${colors.linkDark};
      text-decoration: underline;
    }
  }
`;

export default injectGlobalCss;
