import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Hint = styled.span`
  position: absolute;
  margin-top: ${themeGet('space.o')};
  color: ${themeGet('colors.gray.6')};
  font-size: ${themeGet('fontSizes.sm')};
`;

export default Hint;
