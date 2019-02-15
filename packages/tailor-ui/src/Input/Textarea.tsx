import React, { FunctionComponent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

import { InputProps, inputStyles } from './Input';

export type TextareaProps = InputProps & {
  resize?: boolean;
};

export const StyledTextarea = styled(TextareaAutosize)<TextareaProps>`
  word-wrap: break-word;
  transition: border 0.2s ease;
  resize: ${({ resize }) => (resize ? 'initial' : 'none')};

  ${inputStyles};
`;

const Textarea: FunctionComponent<TextareaProps> = props => (
  <StyledTextarea {...props} />
);

export default Textarea;
