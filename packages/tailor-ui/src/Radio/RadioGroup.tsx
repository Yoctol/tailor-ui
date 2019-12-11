import React, { FC, ReactNode, useCallback, useMemo } from 'react';

import { useOwnValue } from '@tailor-ui/hooks';

import { useFormField } from '../FormField';

import { Direction, RadioContext } from './RadioContext';
import { Radio, RadioProps } from './Radio';
import { RadioGroupFlex } from './styles';

export interface RadioGroupProps extends Omit<RadioProps, 'onChange'> {
  /**
   * To set the initial value
   */
  defaultValue?: string;
  /**
   * to specify the direction of the step bar, `horizontal` and `vertical` are currently supported
   */
  direction?: Direction;
  /**
   * Specifies options
   */
  options?: {
    label: ReactNode;
    value: string;
    disabled?: boolean;
  }[];
  /**
   * Used for setting the currently selected value
   */
  value?: string;
  /**
   * The callback function that is triggered when the state changes
   */
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
