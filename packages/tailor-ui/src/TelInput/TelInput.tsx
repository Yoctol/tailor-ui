import IntlTelInput from 'react-intl-tel-input';
import React, { FC, MouseEventHandler } from 'react';

import { useFormField } from '../FormField';

import StyledTelInput from './style';

type ChangeHandler = (
  isValid: boolean,
  value: string,
  phoneInfo: object,
  fullPhoneNumber: string
) => void;

interface TelInputProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeHandler;
  onBlur?: MouseEventHandler;
  placeholder?: string;
  disabled?: boolean;
}

const TelInput: FC<TelInputProps> = ({
  id,
  name,
  onChange,
  onBlur,
  ...props
}) => {
  const [invalid, labelId, setValue] = useFormField({
    id,
    value: props.value,
    defaultValue: props.defaultValue,
  });

  const onPhoneNumberChange: ChangeHandler = (
    isValid,
    value,
    phoneInfo,
    fullPhoneNumber
  ) => {
    setValue(value);

    if (onChange) {
      onChange(isValid, value, phoneInfo, fullPhoneNumber);
    }
  };

  return (
    <StyledTelInput invalid={invalid}>
      <IntlTelInput
        format
        fieldId={labelId}
        fieldName={name}
        onPhoneNumberBlur={onBlur}
        onPhoneNumberChange={onPhoneNumberChange}
        preferredCountries={['tw']}
        {...props}
      />
    </StyledTelInput>
  );
};

export { TelInput };
