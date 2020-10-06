import React, { FC } from 'react';
import { useField } from 'formik';

import { FormField, RadioGroup, RadioGroupProps } from '../..';
import { mergeEventProps } from '../../utils';

export interface RadioProps extends RadioGroupProps {
  name: string;
  label?: string;
  required?: boolean;
}

const RadioField: FC<RadioProps> = ({
  required,
  label: fieldLabel,
  name,
  options,
  direction,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormField
      required={required}
      label={fieldLabel}
      validationMessage={meta.error && meta.touched ? meta.error : null}
    >
      <RadioGroup
        direction={direction}
        value={field.value}
        options={options}
        {...mergeEventProps(otherProps, {
          onChange: (value: string) => helpers.setValue(value),
        })}
      />
    </FormField>
  );
};

export { RadioField };
