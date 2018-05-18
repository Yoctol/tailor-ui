import styled from 'styled-components';

import Input from './Input';

const Textarea = styled(Input.withComponent('textarea'))`
  height: auto;
`;

export default Textarea;
