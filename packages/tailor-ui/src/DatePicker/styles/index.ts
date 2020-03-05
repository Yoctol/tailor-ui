import styled from 'styled-components';
import { Fragment } from 'react';

import Calendar from './Calendar';
import Common from './common';
import DecadePanel from './DecadePanel';
import MonthPanel from './MonthPanel';
import RangePicker from './RangePicker';
import TimePanel from './TimePanel';
import YearPanel from './YearPanel';
import timepicker from './timepicker';

const DatePickerStyle = styled(Fragment)`
  ${Calendar};
  ${Common};
  ${DecadePanel};
  ${RangePicker};
  ${YearPanel};
  ${MonthPanel};
  ${TimePanel};
  ${timepicker};
`;

export default DatePickerStyle;
