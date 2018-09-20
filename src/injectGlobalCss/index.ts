import styledNormalize from 'styled-normalize';

import { injectGlobal } from 'utils/styled-components';

import base from './base';

const injectGlobalCss = () => injectGlobal`
  ${styledNormalize}

  ${base}
`;

export default injectGlobalCss;
