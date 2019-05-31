import { createGlobalStyle } from 'styled-components';

import Calendar from './Calendar';
import Common from './common';
import DecadePanel from './DecadePanel';
import MonthPanel from './MonthPanel';
import Picker from './Picker';
import TimePanel from './TimePanel';
import YearPanel from './YearPanel';
import timepicker from './timepicker';

const DatePickerStyle = createGlobalStyle`
  ${timepicker};
  ${Common};
  ${Picker};
  ${Calendar};
  ${DecadePanel};
  ${YearPanel};
  ${MonthPanel};
  ${TimePanel};
`;

export default DatePickerStyle;
