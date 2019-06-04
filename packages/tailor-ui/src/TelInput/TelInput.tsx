import IntlTelInput from 'react-intl-tel-input';
import React, { FunctionComponent, MouseEventHandler } from 'react';

import StyledTelInput from './style';

interface TelInputProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (
    isValid: boolean,
    value: string,
    phoneInfo: object,
    fullPhoneNumber: string
  ) => void;
  onBlur?: MouseEventHandler;
}

const TelInput: FunctionComponent<TelInputProps> = ({
  id,
  name,
  onChange,
  onBlur,
  ...props
}) => (
  <StyledTelInput>
    <IntlTelInput
      fieldId={id}
      fieldName={name}
      onPhoneNumberChange={onChange}
      onPhoneNumberBlur={onBlur}
      format
      preferredCountries={['tw']}
      {...props}
    />
  </StyledTelInput>
);

export { TelInput };
