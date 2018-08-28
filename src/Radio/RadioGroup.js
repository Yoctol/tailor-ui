import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Value } from 'react-powerplug';

import Radio from './Radio';
import { Provider } from './RadioContext';

const RadioGroupFlex = styled.div`
  display: ${p => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${p => (p.direction === 'horizontal' ? 'row' : 'column')};
`;

const RadioGroup = ({
  value,
  defaultValue,
  options,
  onChange,
  direction,
  children,
  ...otherProps
}) => (
  <RadioGroupFlex direction={direction}>
    <Value initial={defaultValue} onChange={onChange}>
      {({ value: uncontrolledValue, set }) => (
        <Provider
          value={{
            direction,
            _onChange: _value => (value ? onChange(_value) : set(_value)),
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

RadioGroup.displayName = 'Radio.Group';

RadioGroup.propTypes = {
  /**
   * For composition render
   */
  children: PropTypes.node,
  /**
   * to specify the direction of the step bar, `horizontal` and `vertical` are currently supported
   */
  defaultValue: PropTypes.string,
  /**
   * To set the initial value
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Specifies options
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  /**
   * Used for setting the currently selected value
   */
  value: PropTypes.string,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  children: null,
  direction: 'horizontal',
  value: null,
  defaultValue: '',
  options: null,
  onChange: () => {},
};

export default RadioGroup;
