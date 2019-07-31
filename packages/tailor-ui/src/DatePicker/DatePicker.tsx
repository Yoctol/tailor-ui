import RcCalendar from 'rc-calendar';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import { Moment } from 'moment';

import { useOwnValue } from '@tailor-ui/hooks';

import { Box, Flex } from '../Layout';
import { Input, InputProps } from '../Input';
import { Popover } from '../Popover';
import { Position } from '../constants';
import { useLocale } from '../locale';

import ClearIcon from './ClearIcon';
import DatePickerStyle from './styles';

export interface DatePickerProps {
  clearable?: boolean;
  range?: boolean;
  width?: string | number;
  /**
   * to set date
   */
  value?: Moment | Moment[];
  /**
   * to set default date, if start time or end time is null or undefined, the date range will be an open interval
   */
  defaultValue?: Moment | Moment[];
  /**
   * The props of datepicker input
   */
  inputProps?: InputProps;
  /**
   * a callback function, can be executed when the selected time is changing
   */
  onChange?: (date: Moment | Moment[]) => void;
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
  disabledDate?: (current: Moment) => boolean;
  /**
   * to specify the time that cannot be selected
   */
  disabledTime?: (current: Moment, type: 'start' | 'end') => boolean;
  /**
   * placeholder of date input
   */
  placeholder?: string;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  defaultValue,
  value,
  onChange,
  showTime = false,
  range = false,
  width = range ? '320px' : '255px',
  clearable = false,
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
  const [ownValue, handleChange] = useOwnValue(
    {
      value,
      defaultValue,
      onChange,
    },
    {
      fallbackValue: range ? [] : null,
    }
  );

  const format = useMemo(
    () =>
      formatFromProps ||
      `YYYY-MM-DD${showTime ? ' HH:mm' : ''}${
        showTime && showSecond ? ':ss' : ''
      }`,
    [formatFromProps, showSecond, showTime]
  );

  const RenderCalendar = useMemo(() => (range ? RcRangeCalendar : RcCalendar), [
    range,
  ]);

  const handleClear = useCallback(() => handleChange(range ? [] : null), [
    handleChange,
    range,
  ]);

  const valueProps = useMemo(
    () => ({
      [range ? 'selectedValue' : 'value']: ownValue,
    }),
    [ownValue, range]
  );

  const displayValue = useMemo(() => {
    if (!ownValue) {
      return '';
    }

    if (Array.isArray(ownValue)) {
      return ownValue.map(val => val.format(format)).join(' ~ ');
    }

    return ownValue.format(format);
  }, [format, ownValue]);

  return (
    <>
      <DatePickerStyle />
      <Popover
        position={Position.BOTTOM_LEFT}
        p="0"
        content={handleClose => (
          <RenderCalendar
            showWeekNumber={false}
            showDateInput={false}
            showOk
            format={format}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            locale={locale.DatePicker}
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
            {...valueProps}
            onChange={handleChange}
          />
        )}
      >
        <Flex position="relative" width={width}>
          <Input
            readOnly
            value={displayValue}
            placeholder={placeholder}
            {...inputProps}
          />
          {clearable && (
            <Box
              position="absolute"
              display="inline-flex"
              alignSelf="center"
              right="8px"
            >
              <ClearIcon onClick={handleClear} />
            </Box>
          )}
        </Flex>
      </Popover>
    </>
  );
};

export { DatePicker };
