import React, { FC, FocusEvent } from 'react';
import { useField, useFormikContext } from 'formik';

import { FormField, Textarea, TextareaProps } from 'tailor-ui';
import { mergeEventProps } from '@tailor-ui/utils';

export interface TextareaFieldProps extends TextareaProps {
  name: string;
  label?: string;
  required?: boolean;
}

const TextareaField: FC<TextareaFieldProps> = ({
  required,
  label,
  name,
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
      <Textarea
        {...field}
        id={id}
        {...mergeEventProps(otherProps, {
          onBlur: (event: FocusEvent<HTMLTextAreaElement>) => {
            setFieldValue(name, event.target.value.trim());
            field.onBlur(event);
          },
        })}
      />
    </FormField>
  );
};

export { TextareaField };
