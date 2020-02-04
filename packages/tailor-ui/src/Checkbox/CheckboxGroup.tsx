import React, { ReactNode, forwardRef, useCallback, useMemo } from 'react';

import { useOwnValue } from '@tailor-ui/hooks';

import { useFormField } from '../FormField';

import { Checkbox } from './Checkbox';
import { CheckboxContext, Direction } from './CheckboxContext';
import { CheckboxGroupFlex } from './styles';

export interface CheckboxGroupProps {
  direction?: Direction;
  defaultValue?: string[];
  options?: {
    label: ReactNode;
    value: string;
    disabled?: boolean;
  }[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup(
    {
      value,
      defaultValue,
      onChange,
      options = null,
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

    const child = useMemo(
      () =>
        options
          ? options.map(({ label, value: optionValue, disabled = false }) => (
              <Checkbox
                key={optionValue}
                value={optionValue}
                disabled={disabled}
              >
                {label}
              </Checkbox>
            ))
          : children,
      [children, options]
    );

    return (
      <CheckboxContext.Provider
        value={{
          direction,
          handleChange,
          isChecked,
        }}
      >
        <CheckboxGroupFlex ref={ref} direction={direction} {...otherProps}>
          {child}
        </CheckboxGroupFlex>
      </CheckboxContext.Provider>
    );
  }
);

export { CheckboxGroup };
