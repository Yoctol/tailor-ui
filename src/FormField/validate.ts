import { ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnySchema } from 'yup';

export type FunctionValidator = (value?: any) => string | null;

export interface ObjectValidator {
  rule: (value?: any) => boolean;
  message: string;
}

export type Validator =
  | FunctionValidator
  | AnySchema
  | ObjectValidator
  | ObjectValidator[];

export interface Validate {
  value?: any;
  validationMessage?: ReactNode;
  validator?: Validator;
}

// eslint-disable-next-line no-underscore-dangle
const isSchema = (obj: any): obj is AnySchema => obj && obj.__isYupSchema__;

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

  if (isSchema(validator)) {
    try {
      validator.validateSync(value);

      return {
        invalid: false,
        message: null,
      };
    } catch (err) {
      return {
        invalid: true,
        message: err.name === 'ValidationError' ? err.errors[0] : null,
      };
    }
  }

  if (validator instanceof Function) {
    const message = validator(value);
    return {
      invalid: Boolean(message),
      message,
    };
  }

  if (validator instanceof Object && !Array.isArray(validator)) {
    const invalid = validator.rule(value);
    return {
      invalid,
      message: invalid ? validator.message : null,
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
