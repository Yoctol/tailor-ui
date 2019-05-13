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
  validationMessage?: ReactNode;
  validator?: Validator;
}

export const validate = ({ value, validator, validationMessage }: Validate) => {
  if (validationMessage) {
    return {
      invalid: true,
      message: validationMessage,
    };
  }

  if (!validator) {
    return {
      invalid: false,
      message: null,
    };
  }

  if (validator instanceof Function) {
    const message = validator(value);
    return {
      invalid: Boolean(message),
      message,
    };
  }

  if (Array.isArray(validator)) {
    let returnMessage = null;
    let invalid = false;

    validator.some(({ rule, message }) => {
      if (rule(value)) {
        returnMessage = message;
        invalid = true;
        return true;
      }
      return false;
    });

    return {
      invalid,
      message: returnMessage,
    };
  }

  return {
    invalid: false,
    message: null,
  };
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

  const { invalid, message } = validate({
    value,
    validator,
    validationMessage,
  });

  return (
    <FormFieldContext.Provider
      value={{ invalid, setValue, setLabelId, labelId }}
    >
      <Space mb="16px" {...props}>
        {label && (
          <Label required={required} htmlFor={labelId}>
            {label}
          </Label>
        )}

        {children}
        {invalid && <ValidationMessage>{message}</ValidationMessage>}
      </Space>
    </FormFieldContext.Provider>
  );
};

export default FormField;
