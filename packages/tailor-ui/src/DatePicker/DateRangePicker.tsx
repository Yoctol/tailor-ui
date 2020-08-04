import React, { FC } from 'react';
import { RangePicker, RangePickerProps } from 'rc-picker';

import useSharedProps from './hooks/useSharedProps';
import { DatePickerStyle } from './styles';

export type DateRangePickerProps = Omit<
  RangePickerProps<Date>,
  'generateConfig' | 'locale' | 'prefixCls' | 'picker'
>;

const DateRangePicker: FC<DateRangePickerProps> = (props) => {
  const sharedProps = useSharedProps(props);

  return (
    <>
      <DatePickerStyle />
      <RangePicker<Date> {...sharedProps} />
    </>
  );
};

export { DateRangePicker };
