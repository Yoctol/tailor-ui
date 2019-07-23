import { createGlobalStyle } from 'styled-components';

import Calendar from './Calendar';
import Common from './common';
import MonthPanel from './MonthPanel';
import RangePicker from './RangePicker';
import TimePanel from './TimePanel';
import YearPanel from './YearPanel';
import timepicker from './timepicker';

const DatePickerStyle = createGlobalStyle`
  ${timepicker};
  ${Common};
  ${Calendar};
  ${RangePicker};
  ${YearPanel};
  ${MonthPanel};
  ${TimePanel};
`;

export default DatePickerStyle;
