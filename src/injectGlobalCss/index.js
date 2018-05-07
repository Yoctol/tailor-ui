import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

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
    background: #fff;
    color: #000;
    font-family: 'Helvetica Neue', Arial, sans-serif, 'PingFang TC', 'Microsoft JhengHei';
    font-size: .7rem;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
  }

  a {
    color: $link-color;
    outline: none;
    text-decoration: none;

    &:focus {
      @include control-shadow();
    }

    &:focus,
    &:hover,
    &:active,
    &.active {
      color: $link-color-dark;
      text-decoration: underline;
    }
  }
`;

export default injectGlobalCss;
