import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import Input from './Input';

const Textarea = styled(Input.withComponent(TextareaAutosize))`
  word-wrap: break-word;
`;

export default Textarea;
