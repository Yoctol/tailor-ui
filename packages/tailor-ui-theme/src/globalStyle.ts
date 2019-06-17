import styledNormalize from 'styled-normalize';
import { css } from 'styled-components';
import { rem } from 'polished';

export const globalStyle = css`
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
    font-size: ${rem('16px')};
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${p => p.theme.colors.info};
    text-decoration: none;
    cursor: pointer;
  }

  svg {
    pointer-events: none;
  }
`;