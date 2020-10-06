import Picker from 'rc-picker';
import React, { FC } from 'react';
import { PickerDateProps } from 'rc-picker/lib/Picker';

import useSharedProps from './hooks/useSharedProps';
import { DatePickerStyle } from './styles';

export type DatePickerProps = Omit<
  PickerDateProps<Date>,
  'generateConfig' | 'locale' | 'prefixCls' | 'picker'
>;

const DatePicker: FC<DatePickerProps> = (props) => {
  const sharedProps = useSharedProps(props);

  return (
    <>
      <DatePickerStyle />
      <Picker<Date> {...sharedProps} />
    </>
  );
};

export { DatePicker };
