import TextareaAutosize from 'react-autosize-textarea';
import styled from 'styled-components';
import { TextareaHTMLAttributes } from 'react';

import { InputProps, inputStyles } from './Input';

export type TextareaProps = InputProps &
  TextareaHTMLAttributes<any> & {
    resize?: boolean;
  };

export const StyledTextarea = styled(TextareaAutosize)<TextareaProps>`
  word-wrap: break-word;
  resize: ${({ resize }) => (resize ? 'initial' : 'none')};

  ${inputStyles};

  /* stylelint-disable-next-line order/properties-order */
  transition: border 0.2s ease;
`;

export default StyledTextarea;
