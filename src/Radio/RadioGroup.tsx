import React, { FunctionComponent, useState } from 'react';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Radio from './Radio';
import RadioContext, { Direction } from './RadioContext';

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

const RadioGroup: FunctionComponent<IRadioGroupProps> = ({
  value: controlledValue,
  defaultValue,
  options = null,
  onChange,
  direction = 'horizontal',
  children,
  ...otherProps
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  return (
    <RadioContext.Provider
      value={{
        direction,
        _onChange: _value => {
          if (uncontrolledValue) {
            setUncontrolledValue(_value);
          }

          if (onChange) {
            onChange(_value);
          }
        },
        _isChecked: _value =>
          controlledValue
            ? controlledValue === _value
            : uncontrolledValue === _value,
      }}
    >
      <RadioGroupFlex direction={direction}>
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
      </RadioGroupFlex>
    </RadioContext.Provider>
  );
};

export default RadioGroup;
