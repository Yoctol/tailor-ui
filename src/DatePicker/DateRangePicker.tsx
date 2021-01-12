import React, { PropsWithChildren } from 'react';
import { RangePicker, RangePickerProps } from 'rc-picker';

import useSharedProps from './hooks/useSharedProps';
import { DatePickerStyle } from './styles';

export type DateRangePickerProps<T> = Omit<
  RangePickerProps<T>,
  'locale' | 'prefixCls' | 'picker'
>;

const DateRangePicker = <T extends any = Date>(
  props: PropsWithChildren<DateRangePickerProps<T>>
) => {
  const sharedProps = useSharedProps(props);

  return (
    <>
      <DatePickerStyle />
      <RangePicker<T> {...sharedProps} />
    </>
  );
};

export { DateRangePicker };
