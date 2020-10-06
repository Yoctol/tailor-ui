import React, { ReactNode, forwardRef, useCallback, useMemo } from 'react';

import { useFormField } from '../FormField';
import { useOwnValue } from '../hooks';

import { Direction, RadioContext } from './RadioContext';
import { Radio } from './Radio';
import { RadioGroupFlex } from './styles';

export interface RadioGroupProps {
  children?: ReactNode;
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

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      value,
      defaultValue,
      options = null,
      onChange,
      direction = 'horizontal',
      children,
      ...otherProps
    },
    ref
  ) {
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
      (newValue) => {
        setOwnValue(newValue);
        setValue(newValue);
      },
      [setOwnValue, setValue]
    );

    const isChecked = useCallback((_value) => ownValue === _value, [ownValue]);

    const child = useMemo(
      () =>
        options
          ? options.map(({ label, value: optionValue, disabled = false }) => (
              <Radio key={optionValue} value={optionValue} disabled={disabled}>
                {label}
              </Radio>
            ))
          : children,
      [children, options]
    );

    return (
      <RadioContext.Provider
        value={{
          direction,
          handleChange,
          isChecked,
        }}
      >
        <RadioGroupFlex ref={ref} direction={direction} {...otherProps}>
          {child}
        </RadioGroupFlex>
      </RadioContext.Provider>
    );
  }
);

export { RadioGroup };
