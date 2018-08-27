import PropTypes from 'prop-types';
import React from 'react';
import { Set } from 'react-powerplug';

import Flex from '../Grid/Flex';

import Checkbox from './Checkbox';

const CheckboxGroup = ({
  values: groupValues,
  initialValues,
  options,
  onChange,
  direction,
  ...otherProps
}) => (
  <Flex flexDirection={direction === 'horizontal' ? 'row' : 'column'}>
    <Set initial={initialValues || []} onChange={onChange}>
      {({ add, remove, has }) =>
        options.map(({ label, value, disabled = false }, index) => {
          const spacing = {
            [direction === 'horizontal' ? 'mr' : 'mb']:
              index + 1 !== options.length ? 2 : 0,
          };

          return (
            <Checkbox
              key={label}
              checked={groupValues ? groupValues.includes(value) : has(value)}
              disabled={disabled}
              onChange={event => {
                const { checked } = event.target;
                if (groupValues) {
                  if (groupValues.includes(value) && !checked) {
                    onChange(groupValues.filter(val => val !== value));
                  }
                  if (!groupValues.includes(value) && checked) {
                    onChange([...groupValues, value]);
                  }
                } else {
                  if (has(value) && !checked) {
                    remove(value);
                  }
                  if (!has(value) && checked) {
                    add(value);
                  }
                }
              }}
              {...otherProps}
              {...spacing}
            >
              {label}
            </Checkbox>
          );
        })
      }
    </Set>
  </Flex>
);

CheckboxGroup.displayName = 'CheckboxField.Group';

CheckboxGroup.propTypes = {
  /**
   * to specify the direction of the step bar, `horizontal` and `vertical` are currently supported
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * To set the initial values
   */
  initialValues: PropTypes.arrayOf(PropTypes.string),
  /**
   * Specifies options
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /**
   * Used for setting the currently selected value
   */
  values: PropTypes.arrayOf(PropTypes.string),
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {
  direction: 'horizontal',
  values: null,
  initialValues: null,
  onChange: () => {},
};

export default CheckboxGroup;
