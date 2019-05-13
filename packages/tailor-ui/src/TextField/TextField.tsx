import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useContext,
  useState,
} from 'react';
import { omit } from 'ramda';

import FormFieldContext from '../FormField/FormFieldContext';
import Input from '../Input';
import Textarea from '../Input/Textarea';

import { MaxLength, TextFieldContainer } from './styles';

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
  maxLength,
  textarea = false,
  onChange = null,
  ...props
}) => {
  const { invalid } = useContext(FormFieldContext);
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
    <TextFieldContainer empty={!value} invalid={invalid}>
      <RenderComponent {...inputProps} />
      {maxLength && !invalid && (
        <MaxLength>{maxLength - value.length}</MaxLength>
      )}
      {/* eslint-disable-next-line */}
      {label && <label>{label}</label>}
    </TextFieldContainer>
  );
};

export default TextField;
