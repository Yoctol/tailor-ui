import RcCalendar from 'rc-calendar';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import React, { FC, useCallback, useMemo, useState } from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import { Moment } from 'moment';

import { useOwnValue } from '@tailor-ui/hooks';

import { InputProps } from '../Input';
import { Popover } from '../Popover';
import { Position } from '../constants';
import { useLocale } from '../locale';

import DatePickerInput from './DatePickerInput';
import DatePickerStyle from './styles';
import DatePresets, { Presets } from './DatePresets';

export interface DatePickerProps {
  clearable?: boolean;
  range?: boolean;
  presets?: Presets;
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
  onChange?: (date: Moment | Moment[] | null) => void;
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

const DatePicker: FC<DatePickerProps> = ({
  defaultValue,
  value,
  onChange,
  showTime = false,
  range = false,
  width = range ? '380px' : '240px',
  clearable = false,
  showSecond,
  minuteStep,
  format: formatFromProps,
  disabledDate,
  disabledTime,
  placeholder,
  inputProps = {},
  presets,
  ...props
}) => {
  const { locale } = useLocale();
  const [ownValue, handleOwnValueChange] = useOwnValue(
    {
      value,
      defaultValue,
      onChange,
    },
    {
      fallbackValue: range ? [] : null,
    }
  );

  const [displayDate, setDisplayDate] = useState(ownValue);

  const handleChange = useCallback(
    newValue => {
      handleOwnValueChange(newValue);
      setDisplayDate(newValue);
    },
    [handleOwnValueChange]
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

  const valueProps = range
    ? {
        selectedValue: displayDate,
      }
    : {
        value: displayDate,
        selectedValue: displayDate,
      };

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
    <Popover
      position={Position.BOTTOM_LEFT}
      p="0"
      content={handleClose => (
        <>
          <DatePickerStyle />
          <RenderCalendar
            showWeekNumber={false}
            showDateInput={false}
            showOk={showTime}
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
            renderSidebar={() => (
              <DatePresets
                key="sidebar"
                presets={presets}
                onDateClick={handleChange}
              />
            )}
            {...props}
            {...valueProps}
            onChange={setDisplayDate}
            onSelect={(newValue: Moment | Moment[]) => {
              handleChange(newValue);

              if (!showTime) {
                handleClose();
              }
            }}
          />
        </>
      )}
    >
      <DatePickerInput
        width={width}
        value={displayValue}
        inputProps={inputProps}
        clearable={clearable}
        placeholder={placeholder}
        handleClear={handleClear}
      />
    </Popover>
  );
};

export { DatePicker };
