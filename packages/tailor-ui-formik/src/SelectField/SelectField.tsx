import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';

import { FormField } from 'tailor-ui';
import { Option, Select, SelectProps } from '@tailor-ui/lab';
import { mergeEventProps } from '@tailor-ui/utils';

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
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();
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
          },
        })}
      />
    </FormField>
  );
};

export { SelectField };
