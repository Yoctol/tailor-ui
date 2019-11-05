import React, { FC, FocusEvent } from 'react';
import { useField, useFormikContext } from 'formik';

import { FormField, Input, InputProps } from 'tailor-ui';
import { mergeEventProps } from '@tailor-ui/utils';

export interface InputFieldProps extends InputProps {
  name: string;
  label?: string;
  required?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  required,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();
  const id = `input-${name}`;

  return (
    <FormField
      required={required}
      label={label}
      validationMessage={meta.touched && meta.error ? meta.error : null}
    >
      <Input
        {...field}
        id={id}
        {...mergeEventProps(otherProps, {
          onBlur: (event: FocusEvent<HTMLInputElement>) => {
            setFieldValue(name, event.target.value.trim());
            field.onBlur(event);
          },
        })}
      />
    </FormField>
  );
};

export { InputField };
