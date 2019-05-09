import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  ReactNode,
  useState,
} from 'react';
import styled from 'styled-components';
import { omit } from 'ramda';
import { rem } from 'polished';

import FormField from '../FormField';
import Input from '../Input';
import Textarea, { StyledTextarea } from '../Input/Textarea';
import { StyledInput } from '../Input/styles';

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

const TextFieldContainer = styled(FormField)`
  position: relative;
  margin-top: 10px;

  ${StyledInput /* sc-selector */}, ${StyledTextarea /* sc-selector */} {
    & ~ label {
      position: absolute;
      top: -7px;
      left: 7px;
      padding: 0 2px;
      background-color: #fff;
      color: ${p =>
        p.validationMessage ? p.theme.colors.danger : p.theme.colors.primary};
      font-size: 0.75rem;
      line-height: 1;
      pointer-events: none;

      ${p => p.theme.transition};
    }
  }

  ${StyledInput /* sc-selector */}:invalid, ${StyledTextarea /* sc-selector */}:invalid {
    box-shadow: none;

    & ~ label {
      top: 9px;
      left: 1px;
      padding: 0 ${p => p.theme.paddings.xs};
      color: ${p => p.theme.colors.gray400};
      font-size: ${p => p.theme.fontSizes.base};
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  ${StyledInput /* sc-selector */}:focus, ${StyledTextarea /* sc-selector */}:focus {
    & ~ label {
      top: -7px;
      left: 7px;
      padding: 0 2px;
      background-color: #fff;
      color: ${p =>
        p.validationMessage ? p.theme.colors.danger : p.theme.colors.primary};
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
   * The message will show when success or warning or error is true
   */
  validationMessage?: ReactNode;
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
  onChange?:
    | ChangeEventHandler<HTMLInputElement>
    | FormEventHandler<HTMLTextAreaElement>;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  label = null,
  value: controlledValue,
  defaultValue = '',
  validationMessage,
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
  const RenderComponent = textarea ? Textarea : Input;
  const inputProps = {
    maxLength,
    value,
    onChange: (
      event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
    ) => {
      setUncontrolledValue(event.currentTarget.value);
      if (onChange) {
        onChange(event as any);
      }
    },
    ...(textarea ? omit(['onPressEnter'], props) : props),
  };

  return (
    <TextFieldContainer validationMessage={validationMessage}>
      <RenderComponent {...inputProps} required />
      {maxLength && Boolean(validationMessage) && (
        <MaxLength>{maxLength - value.length}</MaxLength>
      )}
      {/* eslint-disable-next-line */}
      {label && <label>{label}</label>}
    </TextFieldContainer>
  );
};

export default TextField;
