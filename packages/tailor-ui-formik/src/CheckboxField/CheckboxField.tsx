import React, { FC } from 'react';
import { useField } from 'formik';

import { Checkbox, CheckboxGroupProps, FormField } from 'tailor-ui';
import { mergeEventProps } from '@tailor-ui/utils';

export interface CheckboxFieldProps extends CheckboxGroupProps {
  name: string;
  label?: string;
  required?: boolean;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  label: fieldLabel,
  name,
  required,
  options,
  direction,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField<string[]>(name);

  return (
    <FormField
      required={required}
      label={fieldLabel}
      validationMessage={meta.error && meta.touched ? meta.error : null}
    >
      <Checkbox.Group
        direction={direction}
        value={field.value}
        options={options}
        {...mergeEventProps(otherProps, {
          onChange: (value: string[]) => helpers.setValue(value),
        })}
      />
    </FormField>
  );
};

export { CheckboxField };
