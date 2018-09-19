import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Label = styled.label`
  display: block;
  padding-bottom: ${themeGet('space.2')};
  font-size: ${themeGet('fontSizes.sm')};
  line-height: 1;
`;

export default Label;
