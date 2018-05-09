import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

import base from './base';
import typography from './typography';

const injectGlobalCss = () => injectGlobal`
  ${styledNormalize}

  ${base}
  ${typography}
`;

export default injectGlobalCss;
