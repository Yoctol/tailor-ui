import styledNormalize from 'styled-normalize';
import { css } from 'styled-components';
import { rem } from 'polished';

export const globalStyle = css`
  ${styledNormalize}

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
    background: ${(p) => p.theme.colors.light};
    color: ${(p) => p.theme.colors.gray700};
    font-family: Roboto, 'PingFang TC', 'Microsoft JhengHei', 'Helvetica Neue',
      sans-serif;
    font-size: ${rem('16px')};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${(p) => p.theme.colors.info};
    text-decoration: none;
    cursor: pointer;
  }
`;
