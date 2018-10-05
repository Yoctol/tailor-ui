import React, { SFC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styled from 'utils/styled-components';

import { IInputProps, inputStyles } from './index';

export type TextareaProps = IInputProps & {
  resize?: boolean;
};

export const StyledTextarea = styled<TextareaProps, any>(TextareaAutosize)`
  word-wrap: break-word;
  transition: border 0.2s ease;
  resize: ${({ resize }) => (resize ? 'initial' : 'none')};

  ${inputStyles};
`;

const Textarea: SFC<TextareaProps> = props => <StyledTextarea {...props} />;

export default Textarea;
