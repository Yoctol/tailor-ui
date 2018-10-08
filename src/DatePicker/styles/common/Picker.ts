import { css } from 'utils/styled-components';

import { prefixClass } from '../prefix';

export default css`
  ${prefixClass /* sc-custom */}-picker {
    position: absolute;
    z-index: 1000;
    top: -9999px;
    left: -9999px;

    &-hidden {
      display: none;
    }
  }
`;
