import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';

import { Box } from '../Layout';
import { useUID } from '../UIProvider/UIDContext';

import FormFieldContext from './FormFieldContext';
import { Label, ValidationMessage } from './styles';
import { Validator, validate } from './validate';

export interface FormFieldProps {
  label?: ReactNode;
  required?: boolean;
  validator?: Validator;
  validationMessage?: ReactNode;
}

const FormField: FC<FormFieldProps> = ({
  label,
  required = false,
  validator,
  validationMessage,
  children,
  ...otherProps
}) => {
  const getUID = useUID();
  const [mounted, setMounted] = useState(false);
  const [labelId, setLabelId] = useState(() => getUID());
  const [value, setValue] = useState<any>();
  const [{ invalid, message }, setValidationResult] = useState(() =>
    validate({
      value,
      validator,
      validationMessage,
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setValidationResult(
      validate({
        validationMessage,
      })
    );
  }, [validationMessage]);

  const handleValidation = useCallback(() => {
    if (value !== undefined) {
      const result = validate({
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

  const transitions = useTransition(invalid, {
    immediate: !mounted,
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
      friction: 32,
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

        {transitions(
          (style, item) =>
            item && (
              <animated.div style={style}>
                <ValidationMessage>{message}</ValidationMessage>
              </animated.div>
            )
        )}
      </Box>
    </FormFieldContext.Provider>
  );
};

export { FormField };
