// stylelint-disable
import { css } from 'styled-components';

import { prefixClass } from '../prefix';

export default css`
  ${prefixClass}-picker {
    position: absolute;
    z-index: 1000;
    top: -9999px;
    left: -9999px;

    &-hidden {
      display: none;
    }
  }
`;
