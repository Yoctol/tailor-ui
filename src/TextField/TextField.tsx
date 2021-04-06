import React, { ReactNode, useContext, useState } from 'react';
import { omit } from 'ramda';

import FormFieldContext from '../FormField/FormFieldContext';
import { Input, InputProps, Textarea, TextareaProps } from '../Input';

import { MaxLength, TextFieldContainer } from './styles';

export type TextFieldSharedProps = {
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
};

export type TextareaTextFieldProps = TextFieldSharedProps &
  ({ textarea: true } & TextareaProps);

export type InputTextFieldProps = TextFieldSharedProps & InputProps;

export type TextFieldOverload = {
  (props: TextareaTextFieldProps): JSX.Element;
  (props: InputTextFieldProps): JSX.Element;
};

const isTextarea = (
  props: InputTextFieldProps | TextareaTextFieldProps
): props is TextareaTextFieldProps =>
  'textarea' in props && typeof props.textarea === 'boolean' && props.textarea;

const TextField: TextFieldOverload = (
  props: TextareaTextFieldProps | InputTextFieldProps
) => {
  const { invalid } = useContext(FormFieldContext);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    props.defaultValue
  );

  const value =
    props.value || props.value === '' ? props.value : uncontrolledValue ?? '';

  const component = isTextarea(props) ? (
    <Textarea
      {...omit(['textarea', 'onChange'], props)}
      onChange={(event) => {
        setUncontrolledValue(event.currentTarget.value);
        if (props.onChange) {
          props.onChange(event);
        }
      }}
    />
  ) : (
    <Input
      {...omit(['textarea', 'onChange'], props)}
      onChange={(event) => {
        setUncontrolledValue(event.currentTarget.value);
        if (props.onChange) {
          props.onChange(event);
        }
      }}
    />
  );

  const { maxLength, label } = props;

  return (
    <TextFieldContainer empty={!value} invalid={invalid}>
      {component}
      {maxLength && !invalid && (
        <MaxLength>{maxLength - value.length}</MaxLength>
      )}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {label && <label>{label}</label>}
    </TextFieldContainer>
  );
};

export { TextField };
