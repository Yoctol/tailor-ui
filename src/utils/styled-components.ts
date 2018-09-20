import * as styledComponents from 'styled-components';

import theme from '../theme';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  typeof theme
>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
