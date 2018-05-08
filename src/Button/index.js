import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  themeGet,
  color,
  fontSize,
  space,
  width,
  border,
  borderRadius,
} from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import theme from '../theme';
import { controlShadow } from '../utils/shadow';

const Button = styled.button`
  display: inline-block;
  width: ${ifProp('block', '100%')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :focus {
    outline: 0;
    border: ${themeGet('borders.default')} ${themeGet('colors.primary')};
    ${controlShadow(themeGet('colors.primary'))};
  }

  :hover {
    background-color: ${themeGet('colors.gray.7')};
  }

  :disabled {
    cursor: default;
    opacity: .5;
    pointer-events: none;
  }

  ${switchProp('size', {
    sm: css`
      font-size: ${themeGet('fontSizes.sm')};
      height: ${themeGet('space.sizeSm')};
      padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
    `,
    m: css`
      font-size: ${themeGet('fontSizes.default')};
      height: ${themeGet('space.size')};
      padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
    `,
    lg: css`
      font-size: ${themeGet('fontSizes.lg')};
      height: ${themeGet('space.sizeLg')};
      padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
    `,
  })}

  ${color} ${fontSize} ${space} ${width} ${border} ${borderRadius};
`;

Button.propTypes = {
  fixed: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
};

Button.defaultProps = {
  theme,
  bg: 'bgLight',
  size: 'm',
  block: false,
  color: 'bodyFont',
  border: 'default',
  borderRadius: 0,
  borderColor: 'primaryDark',
};

export default Button;
