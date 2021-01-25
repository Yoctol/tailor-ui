import React, { FC } from 'react';
import { PickerPanel, PickerPanelProps } from 'rc-picker';

import useSharedProps from './hooks/useSharedProps';
import { DatePickerStyle } from './styles';

export type DatePickerPanelProps = Omit<
  PickerPanelProps<Date>,
  'generateConfig' | 'locale' | 'prefixCls' | 'picker'
>;

const DatePickerPanel: FC<DatePickerPanelProps> = (props) => {
  const sharedProps = useSharedProps(props);

  return (
    <>
      <DatePickerStyle />
      <PickerPanel<Date> {...sharedProps} />
    </>
  );
};

export { DatePickerPanel };
