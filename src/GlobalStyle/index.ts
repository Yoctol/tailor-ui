import styledNormalize from 'styled-normalize';

import { createGlobalStyle } from 'utils/styled-components';

import base from './base';

const GlobalStyle = () => createGlobalStyle`
  ${styledNormalize}

  ${base}
`;

export default GlobalStyle;
