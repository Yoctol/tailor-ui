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
      height: ${themeGet('controls.sizeSm')};
      padding: ${themeGet('controls.paddingYSm')}
        ${themeGet('controls.paddingXSm')};
    `,
    m: css`
      font-size: ${themeGet('fontSizes.default')};
      height: ${themeGet('controls.size')};
      padding: ${themeGet('controls.paddingY')} ${themeGet('controls.paddingX')};
    `,
    lg: css`
      font-size: ${themeGet('fontSizes.lg')};
      height: ${themeGet('controls.sizeLg')};
      padding: ${themeGet('controls.paddingYLg')}
        ${themeGet('controls.paddingXLg')};
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
