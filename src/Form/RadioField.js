import React from 'react';
import PropTypes from 'prop-types';
import { Value } from 'react-powerplug';

import Radio from '../Radio';
import Space from '../Grid/Space';

import Label from './Label';
import Hint from './Hint';
import FormField from './FormField';

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
  children: PropTypes.string.isRequired,
  error: PropTypes.bool,
  message: PropTypes.string,
  success: PropTypes.bool,
  warning: PropTypes.bool,
};

RadioField.defaultProps = {
  error: false,
  message: '',
  success: false,
  warning: false,
};

const RadioFieldGroup = ({
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

RadioFieldGroup.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  message: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  success: PropTypes.bool,
  value: PropTypes.string.isRequired,
  warning: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
RadioFieldGroup.defaultProps = {
  error: false,
  message: '',
  success: false,
  warning: false,
};

RadioField.Group = RadioFieldGroup;

export default RadioField;
