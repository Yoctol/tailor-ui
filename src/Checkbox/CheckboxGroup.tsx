import React, { SFC, useState } from 'react';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Checkbox from './Checkbox';
import CheckboxContext, { Direction } from './CheckboxContext';

const CheckboxGroupFlex = styled<{ direction: Direction }, 'div'>(tag.div)`
  display: ${p => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${p => (p.direction === 'horizontal' ? 'row' : 'column')};
`;

export interface ICheckboxGroupProps {
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
  options?: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;

  /**
   * Used for setting the currently selected value
   */
  value?: string[];
  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: (value: ReadonlyArray<string>) => void;
}

const CheckboxGroup: SFC<ICheckboxGroupProps> = ({
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
    <CheckboxContext.Provider
      value={{
        direction,
        _onChange: (event, _value) => {
          const { checked } = event.target;
          const targetValue = controlledValue || uncontrolledValue || [];
          let nextValue = targetValue;

          if (targetValue.includes(_value) && !checked) {
            nextValue = targetValue.filter(val => val !== _value);
          }

          if (!targetValue.includes(_value) && checked) {
            nextValue = [...targetValue, _value];
          }

          if (!controlledValue) {
            setUncontrolledValue(nextValue);
          }

          if (onChange) {
            onChange(nextValue);
          }
        },
        _isChecked: _value => {
          const targetValue = controlledValue || uncontrolledValue || [];
          return targetValue.includes(_value);
        },
      }}
    >
      <CheckboxGroupFlex direction={direction}>
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
      </CheckboxGroupFlex>
    </CheckboxContext.Provider>
  );
};

CheckboxGroup.displayName = 'Checkbox.Group';

export default CheckboxGroup;
