import { createGlobalStyle } from 'styled-components';

import { globalStyle } from '@tailor-ui/theme';

import datePickerStyle from '../DatePicker/styles';

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
  ${datePickerStyle}
`;

export { GlobalStyle };
