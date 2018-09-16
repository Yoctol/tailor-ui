import styled from 'styled-components';
import { rem } from 'polished';
import { themeGet } from 'styled-system';

const Hint = styled.div`
  margin-top: ${themeGet('space.1')};
  color: ${themeGet('colors.gray.6')};
  font-size: ${rem('12px')};
`;

export default Hint;
