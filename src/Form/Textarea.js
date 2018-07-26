import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { StyledInput } from './Input';

const Textarea = styled(StyledInput.withComponent(TextareaAutosize))`
  word-wrap: break-word;
  transition: border 0.2s ease;
  resize: ${ifProp('resize', 'initial', 'none')};
`;

export default Textarea;
