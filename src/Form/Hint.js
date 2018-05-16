import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';

const Hint = styled.span`
  margin-top: ${themeGet('space.1')};
  color: ${themeGet('colors.gray.6')};
  font-size: ${themeGet('fontSizes.sm')};

  ${ifProp(
    'success',
    css`
      color: ${themeGet('colors.success')};
    `
  )};
  ${ifProp(
    'warning',
    css`
      color: ${themeGet('colors.warning')};
    `
  )};
  ${ifProp(
    'error',
    css`
      color: ${themeGet('colors.error')};
    `
  )};
`;

Hint.defaultProps = {
  theme,
};

export default Hint;
