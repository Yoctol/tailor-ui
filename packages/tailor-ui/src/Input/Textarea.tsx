import React, {
  ChangeEvent,
  FunctionComponent,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styled from 'styled-components';
import { omit } from 'ramda';

import { mergeEventProps } from '@tailor-ui/utils';

import useFormField from '../FormField/useFormField';

import { InputProps } from './Input';
import { inputStyles } from './styles';

export type TextareaProps = InputProps &
  TextareaHTMLAttributes<any> & {
    resize?: boolean;
  };

export const StyledTextarea = styled(props => (
  <TextareaAutosize {...omit(['invalid'], props)} />
))<TextareaProps>`
  word-wrap: break-word;
  resize: ${({ resize }) => (resize ? 'initial' : 'none')};

  ${inputStyles};

  /* stylelint-disable-next-line order/properties-order */
  height: auto;
  transition: border 0.2s ease;
`;

const Textarea: FunctionComponent<TextareaProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ id, ...props }, ref) => {
  const [invalid, labelId, setValue] = useFormField({
    id,
    value: props.value,
    defaultValue: props.defaultValue,
  });

  return (
    <StyledTextarea
      ref={ref}
      id={labelId}
      invalid={invalid || undefined}
      {...mergeEventProps(props, {
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          setValue(event.currentTarget.value);
        },
      })}
    />
  );
});

export default Textarea;
