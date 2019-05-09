import React, { FunctionComponent, ReactNode, useState } from 'react';

import Space from '../Grid/Space';
import createUIDGenerator from '../utils/createUIDGenerator';

import FormFieldContext from './FormFieldContext';
import { Label, ValidationMessage } from './styles';

export type Validator =
  | ((value: any) => string)
  | ({
      rule: (value: any) => boolean;
      message: string;
    })[];

export interface Validate {
  value: any;
  validator?: Validator;
}

const validate = ({ value, validator }: Validate) => {
  if (!validator) {
    return null;
  }

  if (validator instanceof Function) {
    return validator(value);
  }

  if (Array.isArray(validator)) {
    let validationMessage = null;

    validator.some(({ rule, message }) => {
      if (rule(value)) {
        validationMessage = message;
        return true;
      }
      return false;
    });

    return validationMessage;
  }

  return null;
};

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  validator?: Validator;
  validationMessage?: ReactNode;
}

const getUID = createUIDGenerator('form-field');

const FormField: FunctionComponent<FormFieldProps> = ({
  label,
  required = false,
  validator,
  validationMessage,
  children,
  ...props
}) => {
  const [labelId, setLabelId] = useState(getUID());
  const [value, setValue] = useState('');

  const message = validate({ value, validator }) || validationMessage;

  return (
    <FormFieldContext.Provider
      value={{ invalid: Boolean(message), setValue, setLabelId, labelId }}
    >
      <Space mb="16px" {...props}>
        {label && (
          <Label required={required} htmlFor={labelId}>
            {label}
          </Label>
        )}

        {children}
        {message && <ValidationMessage>{message}</ValidationMessage>}
      </Space>
    </FormFieldContext.Provider>
  );
};

export default FormField;
