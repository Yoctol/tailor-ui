import React, {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useState,
} from 'react';
import styled from 'styled-components';
import { omit } from 'ramda';
import { rem } from 'polished';

import FormField from '../Form/FormField';
import Hint from '../Form/Hint';
import Input, { StyledInput } from '../Input';
import Textarea, { StyledTextarea } from '../Input/Textarea';

const TextFieldLabel = styled.label`
  position: absolute;
  top: -7px;
  left: 7px;
  padding: 0 2px;
  background-color: #fff;
  color: ${p => p.theme.colors.gray700};
  font-size: 0.75rem;
  line-height: 1;
  pointer-events: none;

  ${p => p.theme.transition};
`;

const MaxLength = styled.div`
  position: absolute;
  right: -1px;
  bottom: -2px;
  padding: 1px 5px;
  border: ${p => p.theme.borders.base};
  border-radius: 999px;
  border-color: ${p => p.theme.colors.primary};
  opacity: 0;
  background-color: #fff;
  font-size: ${rem('10px')};
  line-height: 1;
`;

const TextFieldField = styled<any>(FormField)`
  margin-top: 10px;

  ${StyledInput /* sc-selector */}:invalid, ${StyledTextarea /* sc-selector */}:invalid {
    box-shadow: none;

    & ~ ${TextFieldLabel /* sc-selector */} {
      top: 9px;
      left: 1px;
      padding: 0 ${p => p.theme.paddings.xs};
      color: ${p => p.theme.colors.gray400};
      font-size: ${p => p.theme.fontSizes.base};
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  ${StyledInput /* sc-selector */}:focus, ${StyledTextarea /* sc-selector */}:focus {
    & ~ ${TextFieldLabel /* sc-selector */} {
      top: -7px;
      left: 7px;
      padding: 0 2px;
      background-color: #fff;
      color: ${p => p.theme.colors.gray700};
      font-size: 0.75rem;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    & ~ ${MaxLength /* sc-selector */} {
      opacity: 1;
    }
  }
`;

export interface TextFieldProps {
  /**
   * The label text
   */
  label?: string;
  /**
   * value of the TextField
   */
  value?: string;
  /**
   * defaultValue of the TextField
   */
  defaultValue?: string;
  /**
   * Set the textfield status to success
   */
  success?: boolean;
  /**
   * Set the textfield status to warning
   */
  warning?: boolean;
  /**
   * Set the textfield status to error
   */
  error?: boolean;
  /**
   * The message will show when success or warning or error is true
   */
  message?: string;
  /**
   * The content max length of textfield
   */
  maxLength?: number;
  /**
   * Whether the input is a textarea
   */
  textarea?: boolean;
  /**
   * Disabled the TextField
   */
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  label = null,
  value: controlledValue,
  defaultValue = '',
  success = false,
  warning = false,
  error = false,
  message = null,
  maxLength,
  textarea = false,
  onChange = null,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value =
    controlledValue || controlledValue === ''
      ? controlledValue
      : uncontrolledValue;
  const hasHint = success || warning || error;
  const RenderComponent = textarea ? Textarea : Input;
  const inputProps = {
    maxLength,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setUncontrolledValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    },
    ...(textarea ? omit(['onPressEnter'], props) : props),
  };

  return (
    <TextFieldField success={success} warning={warning} error={error}>
      <RenderComponent {...inputProps} required />
      {maxLength && !hasHint && (
        <MaxLength>{maxLength - value.length}</MaxLength>
      )}
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      {hasHint && <Hint>{message}</Hint>}
    </TextFieldField>
  );
};

export default TextField;
