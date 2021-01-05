import React, { useMemo } from 'react';
import format from 'date-fns/format';
import {
  AiOutlineCalendar,
  AiOutlineClose,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';

import { Icon } from '../../Icon';
import { useLocale } from '../../locale';

import dateFnsGenerateConfig from './dateFnsGenerateConfig';

const useSharedProps = <T extends Record<string, unknown>>(props: T) => {
  const { locale } = useLocale();
  const prevIcon = useMemo(
    () => (
      <Icon size="20" type={AiOutlineLeft} cursor="pointer" fill="gray300" />
    ),
    []
  );

  const nextIcon = useMemo(
    () => (
      <Icon size="20" type={AiOutlineRight} cursor="pointer" fill="gray300" />
    ),
    []
  );

  const superPrevIcon = useMemo(
    () => (
      <Icon
        size="20"
        type={AiOutlineDoubleLeft}
        cursor="pointer"
        fill="gray300"
      />
    ),
    []
  );

  const superNextIcon = useMemo(
    () => (
      <Icon
        size="20"
        type={AiOutlineDoubleRight}
        cursor="pointer"
        fill="gray300"
      />
    ),
    []
  );

  const clearIcon = useMemo(
    () => (
      <Icon size="16" type={AiOutlineClose} cursor="pointer" fill="gray300" />
    ),
    []
  );

  const suffixIcon = useMemo(
    () => <Icon size="20" type={AiOutlineCalendar} fill="gray300" />,
    []
  );

  return {
    prefixCls: 'tailor-ui-picker',
    inputReadOnly: true,
    prevIcon,
    nextIcon,
    superPrevIcon,
    superNextIcon,
    clearIcon,
    suffixIcon,
    generateConfig: dateFnsGenerateConfig,
    locale: locale.DatePicker,
    format: (date: Date) =>
      format(date, props.showTime ? 'yyyy−MM−dd HH:mm:ss' : 'yyyy−MM−dd'),
    ...props,
  };
};

export default useSharedProps;
