import styledNormalize from 'styled-normalize';

import { injectGlobal } from 'utils/styled-components';

import datePickerStyles from '../DatePicker/styles';

import base from './base';

const injectGlobalCss = () => injectGlobal`
  ${styledNormalize}

  ${base}
  ${datePickerStyles}
`;

export default injectGlobalCss;
