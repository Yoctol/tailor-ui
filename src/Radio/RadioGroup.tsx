import React, { SFC } from 'react';
import { Value } from 'react-powerplug';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Radio, { Direction } from './Radio';
import { Provider } from './RadioContext';

const RadioGroupFlex = styled<{ direction: Direction }, 'div'>(tag.div)`
  display: ${p => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${p => (p.direction === 'horizontal' ? 'row' : 'column')};
`;

export interface IRadioGroupProps {
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
  options?: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  /**
   * Used for setting the currently selected value
   */
  value?: string;
  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: (value: string) => void;
}

const RadioGroup: SFC<IRadioGroupProps> = ({
  value,
  defaultValue,
  options = null,
  onChange,
  direction = 'horizontal',
  children,
  ...otherProps
}) => (
  <RadioGroupFlex direction={direction}>
    <Value
      initial={defaultValue}
      onChange={_value => {
        if (onChange && _value) {
          onChange(_value);
        }
      }}
    >
      {({ value: uncontrolledValue, set }) => (
        <Provider
          value={{
            direction,
            _onChange: _value =>
              value && onChange ? onChange(_value) : set(_value),
            _isChecked: _value =>
              value ? value === _value : uncontrolledValue === _value,
          }}
        >
          {options
            ? options.map(({ label, value: optionValue, disabled = false }) => (
                <Radio
                  key={label}
                  value={optionValue}
                  disabled={disabled}
                  {...otherProps}
                >
                  {label}
                </Radio>
              ))
            : children}
        </Provider>
      )}
    </Value>
  </RadioGroupFlex>
);

export default RadioGroup;
