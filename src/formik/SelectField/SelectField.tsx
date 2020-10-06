import React, { FC } from 'react';
import { useField } from 'formik';

import { FormField, Option, Select, SelectProps } from '../..';
import { mergeEventProps } from '../../utils';

export interface SelectFieldProps extends SelectProps {
  name: string;
  label?: string;
  required?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  required,
  label,
  name,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);
  const id = `select-${name}`;

  return (
    <FormField
      required={required}
      label={label}
      validationMessage={meta.error && meta.touched ? meta.error : null}
    >
      <Select
        id={id}
        name={name}
        value={field.value}
        {...mergeEventProps(otherProps, {
          onBlur: field.onBlur,
          onChange: (selectedOption: Option | Option[]) => {
            if (!selectedOption) {
              helpers.setValue(null);
              return;
            }

            if (Array.isArray(selectedOption)) {
              helpers.setValue(selectedOption);
              return;
            }

            const changedValue =
              typeof selectedOption === 'object'
                ? selectedOption.value
                : selectedOption;

            helpers.setValue(changedValue);
          },
        })}
      />
    </FormField>
  );
};

export { SelectField };
