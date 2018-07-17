import React from 'react';
import PropTypes from 'prop-types';
import { Set } from 'react-powerplug';

import Checkbox from '../Checkbox';
import Space from '../Grid/Space';

import Label from './Label';
import Hint from './Hint';
import FormField from './FormField';

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
  children: PropTypes.string.isRequired,
  error: PropTypes.bool,
  message: PropTypes.string,
  success: PropTypes.bool,
  warning: PropTypes.bool,
};

CheckboxField.defaultProps = {
  error: false,
  message: '',
  success: false,
  warning: false,
};

const CheckboxFieldGroup = ({
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

CheckboxFieldGroup.propTypes = {
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
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  warning: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
CheckboxFieldGroup.defaultProps = {
  error: false,
  message: '',
  success: false,
  warning: false,
};

CheckboxField.Group = CheckboxFieldGroup;

export default CheckboxField;
