import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

import base from './base';

const injectGlobalCss = () => injectGlobal`
  ${styledNormalize}
  ${base}
`;

export default injectGlobalCss;
