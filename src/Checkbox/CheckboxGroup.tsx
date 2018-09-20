import React, { SFC } from 'react';
import { Set } from 'react-powerplug';

import styled from 'utils/styled-components';

import Checkbox, { Direction } from './Checkbox';
import { Provider } from './CheckboxContext';

const CheckboxGroupFlex = styled<{ direction: Direction }, 'div'>('div')`
  display: ${p => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${p => (p.direction === 'horizontal' ? 'row' : 'column')};
`;

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
  onChange?: (value: ReadonlyArray<string>) => void;
}

const CheckboxGroup: SFC<CheckboxGroupProps> = ({
  value,
  defaultValue,
  options = null,
  onChange,
  direction = 'horizontal',
  children,
  ...otherProps
}) => (
  <CheckboxGroupFlex direction={direction}>
    <Set
      initial={defaultValue || []}
      onChange={_value => {
        if (onChange && _value) {
          onChange(_value);
        }
      }}
    >
      {({ add, remove, has }) => (
        <Provider
          value={{
            direction,
            _onChange: (event, _value) => {
              const { checked } = event.target;

              if (value) {
                if (value.includes(_value) && !checked && onChange) {
                  onChange(value.filter(val => val !== _value));
                }
                if (!value.includes(_value) && checked && onChange) {
                  onChange([...value, _value]);
                }
              } else {
                if (has(_value) && !checked) {
                  remove(_value);
                }
                if (!has(_value) && checked) {
                  add(_value);
                }
              }
            },
            _isChecked: _value =>
              value ? value.includes(_value) : has(_value),
          }}
        >
          {options
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
            : children}
        </Provider>
      )}
    </Set>
  </CheckboxGroupFlex>
);

CheckboxGroup.displayName = 'Checkbox.Group';

export default CheckboxGroup;
