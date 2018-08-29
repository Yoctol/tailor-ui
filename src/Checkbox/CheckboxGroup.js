import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Set } from 'react-powerplug';

import Checkbox from './Checkbox';
import { Provider } from './CheckboxContext';

const CheckboxGroupFlex = styled.div`
  display: ${p => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${p => (p.direction === 'horizontal' ? 'row' : 'column')};
`;

const CheckboxGroup = ({
  value,
  defaultValue,
  options,
  onChange,
  direction,
  children,
  ...otherProps
}) => (
  <CheckboxGroupFlex direction={direction}>
    <Set initial={defaultValue} onChange={onChange}>
      {({ add, remove, has }) => (
        <Provider
          value={{
            direction,
            _onChange: (event, _value) => {
              const { checked } = event.target;

              if (value) {
                if (value.includes(_value) && !checked) {
                  onChange(value.filter(val => val !== _value));
                }
                if (!value.includes(_value) && checked) {
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

CheckboxGroup.propTypes = {
  /**
   * For composition render
   */
  children: PropTypes.node,
  /**
   * to specify the direction of the step bar, `horizontal` and `vertical` are currently supported
   */
  defaultValue: PropTypes.arrayOf(PropTypes.string),
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
  value: PropTypes.arrayOf(PropTypes.string),
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {
  children: null,
  direction: 'horizontal',
  value: null,
  defaultValue: [],
  options: null,
  onChange: () => {},
};

export default CheckboxGroup;
