import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';

import { Checkbox, CheckboxGroupProps, FormField } from 'tailor-ui';

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
  const [field, meta] = useField<string[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  return (
    <FormField
      required={required}
      label={fieldLabel}
      validationMessage={meta.error && meta.touched ? meta.error : null}
    >
      <Checkbox.Group
        direction={direction}
        value={field.value}
        onChange={value => setFieldValue(name, value)}
        onFocus={() => setFieldTouched(name)}
        options={options}
        {...otherProps}
      />
    </FormField>
  );
};

export { CheckboxField };
