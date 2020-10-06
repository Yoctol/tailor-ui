import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEventHandler,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { omit } from 'ramda';

import FormFieldContext from '../FormField/FormFieldContext';
import { Input, Textarea } from '../Input';

import { MaxLength, TextFieldContainer } from './styles';

export interface TextFieldProps {
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  textarea?: boolean;
  disabled?: boolean;
  autoSelect?: boolean;
  autoFocus?: boolean;
  onChange?:
    | ChangeEventHandler<HTMLInputElement>
    | FormEventHandler<HTMLTextAreaElement>;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const TextField: FC<TextFieldProps> = ({
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

export { TextField };
