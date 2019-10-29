import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';

import { FormField } from 'tailor-ui';
import { Select, SelectProps } from '@tailor-ui/lab';

export interface SelectFieldProps extends SelectProps {
  name: string;
  label?: string;
  required?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  required,
  label,
  name,
  options,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();
  const id = `select-${name}`;

  const selectedValue = options.find(
    option =>
      (typeof option === 'object' ? option.value : option) === field.value
  );

  return (
    <FormField
      required={required}
      label={label}
      validationMessage={meta.error && meta.touched ? meta.error : null}
    >
      <Select
        id={id}
        options={options}
        name={name}
        value={selectedValue}
        onBlur={field.onBlur}
        onChange={selectedOption => {
          if (!selectedOption) {
            setFieldValue(name, null);
            return;
          }

          if (Array.isArray(selectedOption)) {
            setFieldValue(name, selectedOption);
            return;
          }

          const changedValue =
            typeof selectedOption === 'object'
              ? selectedOption.value
              : selectedOption;

          setFieldValue(name, changedValue);
        }}
        {...otherProps}
      />
    </FormField>
  );
};

export { SelectField };
