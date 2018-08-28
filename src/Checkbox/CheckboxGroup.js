import PropTypes from 'prop-types';
import React from 'react';
import { Set } from 'react-powerplug';

import Flex from '../Grid/Flex';

import Checkbox from './Checkbox';
import { Provider } from './CheckboxContext';

const CheckboxGroup = ({
  value,
  defaultValue,
  options,
  onChange,
  direction,
  children,
  ...otherProps
}) => (
  <Flex flexDirection={direction === 'horizontal' ? 'row' : 'column'}>
    <Set initial={defaultValue} onChange={onChange}>
      {({ add, remove, has }) => (
        <Provider
          value={{
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
            ? options.map(
                ({ label, value: optionValue, disabled = false }, index) => {
                  const spacing = {
                    [direction === 'horizontal' ? 'mr' : 'mb']:
                      index + 1 !== options.length ? 2 : 0,
                  };

                  return (
                    <Checkbox
                      key={label}
                      value={optionValue}
                      disabled={disabled}
                      {...otherProps}
                      {...spacing}
                    >
                      {label}
                    </Checkbox>
                  );
                }
              )
            : children}
        </Provider>
      )}
    </Set>
  </Flex>
);

CheckboxGroup.displayName = 'CheckboxField.Group';

CheckboxGroup.propTypes = {
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
