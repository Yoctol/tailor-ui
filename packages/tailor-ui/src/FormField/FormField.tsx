import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Box } from '../Layout';
import { useUID } from '../UIProvider/UIDContext';

import FormFieldContext, { Value } from './FormFieldContext';
import { Label, ValidationMessage } from './styles';
import { Validator, validate } from './validate';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  validator?: Validator;
  validationMessage?: ReactNode;
}

const FormField: FunctionComponent<FormFieldProps> = ({
  label,
  required = false,
  validator,
  validationMessage,
  children,
  ...props
}) => {
  const getUID = useUID();
  const [labelId, setLabelId] = useState(() => getUID());
  const [value, setValue] = useState<Value>();
  const [{ invalid, message }, setValidationResult] = useState({
    invalid: false,
    message: null,
  });

  const handleValidation = useCallback(async () => {
    if (value !== undefined) {
      const result = await validate({
        value,
        validator,
        validationMessage,
      });

      setValidationResult(result);
    }
  }, [validationMessage, validator, value]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

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

export { FormField };
