import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { animated, useTransition } from 'react-spring';

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
  ...otherProps
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

  const transitions = useTransition(invalid, null, {
    from: {
      height: 0,
      opacity: 0,
    },
    enter: {
      height: 22,
      opacity: 1,
    },
    leave: {
      height: 0,
      opacity: 0,
    },
    config: {
      tension: 320,
      friction: 24,
    },
  });

  return (
    <FormFieldContext.Provider
      value={{ invalid, setValue, setLabelId, labelId }}
    >
      <Box mb="16px" {...otherProps}>
        {label && (
          <Label required={required} htmlFor={labelId}>
            {label}
          </Label>
        )}

        {children}

        {transitions.map(
          ({ key, item, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <ValidationMessage>{message}</ValidationMessage>
              </animated.div>
            )
        )}
      </Box>
    </FormFieldContext.Provider>
  );
};

export { FormField };
