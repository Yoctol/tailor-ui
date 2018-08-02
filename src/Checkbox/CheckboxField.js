import PropTypes from 'prop-types';
import React from 'react';
import { Set } from 'react-powerplug';

import FormField from '../Form/FormField';
import Hint from '../Form/Hint';
import Label from '../Form/Label';
import Space from '../Grid/Space';

import Checkbox from '.';

let seed = 0;

const getUuid = () => {
  seed += 1;
  return `yoctol_checkbox_${Date.now()}_${seed}`;
};

const CheckboxField = ({
  children,
  success,
  warning,
  error,
  message,
  ...otherProps
}) => {
  const id = getUuid();
  return (
    <FormField success={success} warning={warning} error={error}>
      <Checkbox id={id} {...otherProps} />
      <Label htmlFor={id}>{children}</Label>
      {(success || warning || error) && <Hint>{message}</Hint>}
    </FormField>
  );
};

CheckboxField.propTypes = {
  /**
   * Specifies whether the checkbox is selected
   */
  checked: PropTypes.bool,
  /**
   * The label of checkbox field
   */
  children: PropTypes.string.isRequired,
  /**
   * Disable checkbox
   */
  disabled: PropTypes.bool,
  /**
   * Set the checkbox group status to error
   */
  error: PropTypes.bool,
  /**
   * The message will show when success or warning or error is true
   */
  message: PropTypes.string,
  /**
   * Set the checkbox group status to success
   */
  success: PropTypes.bool,
  /**
   * Set the checkbox group status to warning
   */
  warning: PropTypes.bool,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

CheckboxField.defaultProps = {
  disabled: false,
  checked: false,
  error: false,
  message: '',
  success: false,
  warning: false,
  onChange: () => {},
};

export const CheckboxFieldGroup = ({
  label: groupLabel,
  values: groupValues,
  options,
  onChange,
  success,
  warning,
  error,
  message,
  ...otherProps
}) => (
  <Set initial={groupValues} onChange={onChange}>
    {({ add, remove, has }) => (
      <FormField success={success} warning={warning} error={error}>
        <Label>{groupLabel}</Label>
        {options.map(({ label, value, disabled = false }) => {
          const id = getUuid();
          return (
            <Space mt={2} mb={1} key={label}>
              <Checkbox
                id={id}
                checked={has(value)}
                disabled={disabled}
                onChange={event => {
                  const { checked } = event.target;
                  if (has(value) && !checked) {
                    remove(value);
                  }
                  if (!has(value) && checked) {
                    add(value);
                  }
                }}
                {...otherProps}
              />
              <Label htmlFor={id}>{label}</Label>
            </Space>
          );
        })}
        {(success || warning || error) && <Hint>{message}</Hint>}
      </FormField>
    )}
  </Set>
);

CheckboxFieldGroup.displayName = 'CheckboxField.Group';

CheckboxFieldGroup.propTypes = {
  /**
   * Set the checkbox field group status to error
   */
  error: PropTypes.bool,
  /**
   * The label of checkbox field group
   */
  label: PropTypes.string.isRequired,
  /**
   * The message will show when success or warning or error is true
   */
  message: PropTypes.string,
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
   * Set the checkbox field group status to success
   */
  success: PropTypes.bool,
  /**
   * Used for setting the currently selected value
   */
  values: PropTypes.arrayOf(PropTypes.string),
  /**
   * Set the checkbox field group status to warning
   */
  warning: PropTypes.bool,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

CheckboxFieldGroup.defaultProps = {
  error: false,
  message: '',
  success: false,
  warning: false,
  values: [],
  onChange: () => {},
};

CheckboxField.Group = CheckboxFieldGroup;

export default CheckboxField;
