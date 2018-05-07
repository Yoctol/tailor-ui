import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

const injectGlobalCss = () => injectGlobal`
  ${styledNormalize}

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif, 'PingFang TC', 'Microsoft JhengHei';
  }
`;

export default injectGlobalCss;
