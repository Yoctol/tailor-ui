import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  themeGet,
  color,
  fontSize,
  space,
  width,
  border,
  borderColor,
  borderRadius,
} from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import theme from '../theme';
import { controlShadow } from '../utils/shadow';

const Button = styled.button`
  display: inline-block;
  width: ${ifProp('block', '100%')};
  line-height: ${themeGet('lineHeight')};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:focus {
    border: ${themeGet('borders.default')} ${themeGet('colors.primaryDark')};
    outline: 0;
    ${controlShadow(themeGet('colors.primary'))};
  }

  &:hover {
    background-color: ${themeGet('colors.gray.8')};
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }

  ${switchProp('size', {
    sm: css`
      height: ${themeGet('space.sizeSm')};
      padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
      font-size: ${themeGet('fontSizes.sm')};
    `,

    m: css`
      height: ${themeGet('space.size')};
      padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
      font-size: ${themeGet('fontSizes.default')};
    `,

    lg: css`
      height: ${themeGet('space.sizeLg')};
      padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
      font-size: ${themeGet('fontSizes.lg')};
    `,
  })};
  ${color};
  ${fontSize};
  ${space};
  ${width};
  ${border};
  ${borderColor};
  ${borderRadius};
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
`;

Button.propTypes = {
  fixed: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
  ...color.propTypes,
  ...fontSize.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...border.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
};

Button.defaultProps = {
  theme,
  bg: 'bgLight',
  size: 'm',
  block: false,
  color: 'bodyFont',
  border: 'default',
  borderRadius: 1,
  borderColor: 'primary',
};

export default Button;
