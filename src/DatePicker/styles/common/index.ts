// stylelint-disable
import { css } from 'utils/styled-components';

import { prefixClass } from '../prefix';

import Calendar from './Calendar';
import Picker from './Picker';

export default css`
  ${prefixClass} {
    box-sizing: border-box;
    * {
      box-sizing: border-box;
    }
  }

  ${prefixClass}-hidden {
    display: none;
  }

  ${Calendar};
  ${Picker};
`;
