import RcCalendar from 'rc-calendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import React, { FunctionComponent, useContext } from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import { Moment } from 'moment';

import Input from '../Input';
import { LocaleContext } from '../UIProvider';

export interface DatePickerProps {
  /**
   * a callback function, can be executed when the selected time is changing
   */
  onChange: (date: Moment | null, dateString: string) => void;
  /**
   * to provide an additional time selection
   */
  showTime?: boolean;
  /**
   * Whether show second
   */
  showSecond?: boolean;
  /**
   * Interval between minutes in picker
   */
  minuteStep?: number;
  /**
   * to set the date format, refer to moment.js
   */
  format?: string;
  /**
   * specify the date that cannot be selected
   */
  disabledDate?: (current?: Moment) => boolean;
  /**
   * to specify the time that cannot be selected
   */
  disabledTime?: (current?: Moment, type?: 'start' | 'end') => boolean;
  /**
   * placeholder of date input
   */
  placeholder?: string;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  onChange,
  showTime,
  showSecond,
  minuteStep,
  format: propsFormat,
  disabledDate,
  disabledTime,
  placeholder,
  ...props
}) => {
  const { locale } = useContext(LocaleContext);
  let format = propsFormat;

  if (!format) {
    format = `YYYY-MM-DD${showTime ? ' HH:mm' : ''}${
      showTime && showSecond ? ':ss' : ''
    }`;
  }

  return (
    <RcDatePicker
      animation="slide-up"
      onChange={(value: Moment) => {
        if (!value) {
          return onChange(null, '');
        }

        return onChange(value, value.format(format));
      }}
      {...props}
      calendar={
        <RcCalendar
          format={format}
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          locale={locale.DatePicker}
          showWeekNumber={false}
          dateInputPlaceholder={placeholder}
          showOk
          timePicker={
            showTime && (
              <TimePickerPanel
                minuteStep={minuteStep}
                showSecond={showSecond}
              />
            )
          }
        />
      }
    >
      {({ value }: { value: Moment }) => (
        <Input
          readOnly
          width="253px"
          value={value ? value.format(format) : ''}
          placeholder={placeholder}
        />
      )}
    </RcDatePicker>
  );
};

export default DatePicker;
