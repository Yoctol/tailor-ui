import React, { FC, ReactNode, useCallback, useMemo } from 'react';

import { useOwnValue } from '@tailor-ui/hooks';

import { useFormField } from '../FormField';

import { Direction, RadioContext } from './RadioContext';
import { Radio, RadioProps } from './Radio';
import { RadioGroupFlex } from './styles';

export interface RadioGroupProps extends Omit<RadioProps, 'onChange'> {
  defaultValue?: string;
  direction?: Direction;
  options?: {
    label: ReactNode;
    value: string;
    disabled?: boolean;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({
  value,
  defaultValue,
  options = null,
  onChange,
  direction = 'horizontal',
  children,
  ...otherProps
}) => {
  const [ownValue, setOwnValue] = useOwnValue(
    {
      value,
      defaultValue,
      onChange,
    },
    { fallbackValue: '' }
  );

  const [, , setValue] = useFormField({
    value: ownValue,
  });

  const handleChange = useCallback(
    newValue => {
      setOwnValue(newValue);
      setValue(newValue);
    },
    [setOwnValue, setValue]
  );

  const isChecked = useCallback(_value => ownValue === _value, [ownValue]);

  const radioButtons = useMemo(
    () =>
      options
        ? options.map(({ label, value: optionValue, disabled = false }) => (
            <Radio
              key={optionValue}
              value={optionValue}
              disabled={disabled}
              {...otherProps}
            >
              {label}
            </Radio>
          ))
        : children,
    [children, options, otherProps]
  );

  return (
    <RadioContext.Provider
      value={{
        direction,
        handleChange,
        isChecked,
      }}
    >
      <RadioGroupFlex direction={direction}>{radioButtons}</RadioGroupFlex>
    </RadioContext.Provider>
  );
};

export { RadioGroup };
