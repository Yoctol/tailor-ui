/* eslint react/no-multi-comp: off */
import React, {
  ChangeEvent,
  FC,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styled from 'styled-components';
import { omit } from 'ramda';

import { mergeEventProps } from '../utils';
import { useFormField } from '../FormField';

import { inputStyles } from './styles';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  resize?: boolean;
  onResize?: (e: Event) => void;
  maxRows?: number;
  async?: boolean;
};

export const StyledTextarea = styled(
  forwardRef<HTMLTextAreaElement>(function StyledTextarea(props, ref) {
    return <TextareaAutosize ref={ref} {...omit(['invalid'], props)} />;
  })
)<TextareaProps>`
  word-wrap: break-word;
  resize: ${({ resize }) => (resize ? 'initial' : 'none')};

  ${inputStyles};

  /* stylelint-disable-next-line order/properties-order */
  height: auto;
  transition: border 0.2s ease;
`;

const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea({ id, ...props }, ref) {
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

export { Textarea };
