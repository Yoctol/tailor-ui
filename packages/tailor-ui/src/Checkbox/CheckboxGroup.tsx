import React, { FC, useCallback, useMemo } from 'react';

import { useOwnValue } from '@tailor-ui/hooks';

import { useFormField } from '../FormField';

import { Checkbox } from './Checkbox';
import { CheckboxContext, Direction } from './CheckboxContext';
import { CheckboxGroupFlex } from './styles';

export interface CheckboxGroupProps {
  /**
   * to specify the direction of the step bar, `horizontal` and `vertical` are currently supported
   */
  direction?: Direction;
  /**
   * To set the initial value
   */
  defaultValue?: string[];
  /**
   * Specifies options
   */
  options?: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];

  /**
   * Used for setting the currently selected value
   */
  value?: string[];
  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: (value: string[]) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  value,
  defaultValue,
  onChange,
  options = null,
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
    {
      fallbackValue: [],
    }
  );

  const [, , setValue] = useFormField({
    value: ownValue,
  });

  const handleChange = useCallback(
    (event, newValue) => {
      const { checked } = event.target;
      let nextValue = ownValue;

      if (ownValue.includes(newValue) && !checked) {
        nextValue = ownValue.filter(val => val !== newValue);
      }

      if (!ownValue.includes(newValue) && checked) {
        nextValue = [...ownValue, newValue];
      }

      setOwnValue(nextValue);
      setValue(nextValue);
    },
    [ownValue, setOwnValue, setValue]
  );

  const isChecked = useCallback(_value => ownValue.includes(_value), [
    ownValue,
  ]);

  const checkBoxes = useMemo(
    () =>
      options
        ? options.map(({ label, value: optionValue, disabled = false }) => (
            <Checkbox
              key={label}
              value={optionValue}
              disabled={disabled}
              {...otherProps}
            >
              {label}
            </Checkbox>
          ))
        : children,
    [children, options, otherProps]
  );

  return (
    <CheckboxContext.Provider
      value={{
        direction,
        handleChange,
        isChecked,
      }}
    >
      <CheckboxGroupFlex direction={direction}>{checkBoxes}</CheckboxGroupFlex>
    </CheckboxContext.Provider>
  );
};

CheckboxGroup.displayName = 'Checkbox.Group';

export { CheckboxGroup };
