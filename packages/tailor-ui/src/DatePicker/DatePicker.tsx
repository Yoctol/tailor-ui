import RcCalendar from 'rc-calendar';
import React, { FunctionComponent, useState } from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import { Input, InputProps } from '../Input';
import { Popover } from '../Popover';
import { Position } from '../constants';
import { useLocale } from '../locale';

import DatePickerStyle from './styles';

export interface DatePickerProps {
  /**
   * to set date
   */
  value?: any;
  /**
   * to set default date, if start time or end time is null or undefined, the date range will be an open interval
   */
  defaultValue?: any;
  /**
   * The props of datepicker input
   */
  inputProps?: InputProps;
  /**
   * a callback function, can be executed when the selected time is changing
   */
  onChange: (date: any, dateString: string) => void;
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
  disabledDate?: (current?: any) => boolean;
  /**
   * to specify the time that cannot be selected
   */
  disabledTime?: (current?: any, type?: 'start' | 'end') => boolean;
  /**
   * placeholder of date input
   */
  placeholder?: string;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  onChange,
  showTime = false,
  showSecond,
  minuteStep,
  format: formatFromProps,
  disabledDate,
  disabledTime,
  placeholder,
  inputProps = {},
  ...props
}) => {
  const { locale } = useLocale();
  const [val, setVal] = useState(() => props.value || props.defaultValue);
  const format =
    formatFromProps ||
    `YYYY-MM-DD${showTime ? ' HH:mm' : ''}${
      showTime && showSecond ? ':ss' : ''
    }`;

  return (
    <>
      <DatePickerStyle />
      <Popover
        position={Position.BOTTOM_LEFT}
        p="0"
        content={handleClose => (
          <RcCalendar
            showWeekNumber={false}
            showDateInput={false}
            showOk
            format={format}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            locale={locale.DatePicker}
            dateInputPlaceholder={placeholder}
            onOk={handleClose}
            timePicker={
              showTime ? (
                <TimePickerPanel
                  minuteStep={minuteStep}
                  showSecond={showSecond}
                />
              ) : null
            }
            {...props}
            onChange={(value: any) => {
              if (!value) {
                onChange(null, '');
                setVal(null);
              } else {
                onChange(value, value.format(format));
                setVal(value);
              }
            }}
          />
        )}
      >
        <Input
          readOnly
          width="251px"
          value={val ? val.format(format) : ''}
          placeholder={placeholder}
          {...inputProps}
        />
      </Popover>
    </>
  );
};

export { DatePicker };
