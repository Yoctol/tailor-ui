import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Label = styled.label`
  display: block;
  padding-bottom: ${themeGet('space.1')};
  color: ${themeGet('colors.gray.4')};
  font-size: 0.7rem;
  line-height: 1;
`;

export default Label;
