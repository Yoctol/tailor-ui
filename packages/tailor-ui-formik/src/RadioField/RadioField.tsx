import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';

import { FormField, Radio, RadioGroupProps } from 'tailor-ui';

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
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  return (
    <FormField
      required={required}
      label={fieldLabel}
      validationMessage={meta.error && meta.touched ? meta.error : null}
    >
      <Radio.Group
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

export { RadioField };
