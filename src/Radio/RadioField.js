import PropTypes from 'prop-types';
import React from 'react';
import { Value } from 'react-powerplug';

import FormField from '../Form/FormField';
import Hint from '../Form/Hint';
import Label from '../Form/Label';
import Space from '../Grid/Space';

import Radio from '.';

let seed = 0;

const getUuid = () => {
  seed += 1;
  return `yoctol_radio_${Date.now()}_${seed}`;
};

const RadioField = ({
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
      <Radio id={id} {...otherProps} />
      <Label htmlFor={id}>{children}</Label>
      {(success || warning || error) && <Hint>{message}</Hint>}
    </FormField>
  );
};

RadioField.propTypes = {
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

RadioField.defaultProps = {
  disabled: false,
  checked: false,
  error: false,
  message: '',
  success: false,
  warning: false,
  onChange: () => {},
};

export const RadioFieldGroup = ({
  label: groupLabel,
  value: groupValues,
  options,
  onChange,
  success,
  warning,
  error,
  message,
  ...otherProps
}) => (
  <Value initial={groupValues} onChange={onChange}>
    {({ value: checkedValue, set }) => (
      <FormField success={success} warning={warning} error={error}>
        <Label>{groupLabel}</Label>
        {options.map(({ label, value, disabled = false }) => {
          const id = getUuid();
          return (
            <Space mt={2} mb={1} key={label}>
              <Radio
                id={id}
                disabled={disabled}
                checked={checkedValue === value}
                onChange={() => set(value)}
                {...otherProps}
              />
              <Label htmlFor={id}>{label}</Label>
            </Space>
          );
        })}
        {(success || warning || error) && <Hint>{message}</Hint>}
      </FormField>
    )}
  </Value>
);

RadioFieldGroup.displayName = 'RadioField.Group';

RadioFieldGroup.propTypes = {
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
  value: PropTypes.arrayOf(PropTypes.string),
  /**
   * Set the checkbox field group status to warning
   */
  warning: PropTypes.bool,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};
RadioFieldGroup.defaultProps = {
  error: false,
  message: '',
  success: false,
  warning: false,
  value: '',
  onChange: () => {},
};

RadioField.Group = RadioFieldGroup;

export default RadioField;
