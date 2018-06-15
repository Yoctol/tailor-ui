import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { ifProp } from 'styled-tools';

import Input from './Input';

const Textarea = styled(Input.withComponent(TextareaAutosize))`
  word-wrap: break-word;
  transition: border 0.2s ease;
  resize: ${ifProp('resize', 'initial', 'none')};
`;

export default Textarea;
