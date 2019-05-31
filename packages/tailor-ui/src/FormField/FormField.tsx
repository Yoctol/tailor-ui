import React, { FunctionComponent, ReactNode, useState } from 'react';

import Box from '../Layout/Box';
import createUIDGenerator from '../utils/createUIDGenerator';

import FormFieldContext, { Value } from './FormFieldContext';
import { Label, ValidationMessage } from './styles';

export type Validator =
  | ((value?: Value) => string | null)
  | ({
      rule: (value?: Value) => boolean;
      message: string;
    })[];

export interface Validate {
  value?: Value;
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
  const [value, setValue] = useState<Value>();

  const { invalid, message } = validate({
    value,
    validator,
    validationMessage,
  });

  return (
    <FormFieldContext.Provider
      value={{ invalid, setValue, setLabelId, labelId }}
    >
      <Box mb="16px" {...props}>
        {label && (
          <Label required={required} htmlFor={labelId}>
            {label}
          </Label>
        )}

        {children}
        {invalid && <ValidationMessage>{message}</ValidationMessage>}
      </Box>
    </FormFieldContext.Provider>
  );
};

export default FormField;
