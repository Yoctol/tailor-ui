import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, complexStyle, space } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';
import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';

const buttonSizes = {
  sm: {
    height: theme.space.sizeSm,
    padding: `${theme.space.paddingYSm} ${theme.space.paddingXSm}`,
    fontSize: theme.fontSizes.sm,
  },
  m: {
    height: theme.space.size,
    padding: `${theme.space.paddingY} ${theme.space.paddingX}`,
    fontSize: theme.fontSizes.default,
  },
  lg: {
    height: theme.space.sizeLg,
    padding: `${theme.space.paddingYLg} ${theme.space.paddingXLg}`,
    fontSize: theme.fontSizes.lg,
  },
};

const sizes = complexStyle({ prop: 'size', key: 'buttonSizes' });

const Button = styled.button`
  display: inline-block;
  width: ${ifProp('block', '100%')};
  border: ${themeGet('borders.default')};
  border-radius: ${ifProp('circle', '999px', themeGet('radii.1'))};
  color: ${themeGet('colors.light')};
  line-height: ${themeGet('lineHeight')};
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: ${themeGet('colors.primary')};
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }

  ${ifProp(
    'ghost',
    css`
      background-color: transparent;
      border-color: ${themeGet('colors.light')};
      &:focus {
        background-color: ${themeGet('colors.primary')};
        ${controlShadow(themeGet('colors.light'))};
      }
    `,
    css`
      background-color: ${themeGet('colors.primaryDark')};
      border-color: ${themeGet('colors.primary')};

      &:focus {
        border-color: ${themeGet('colors.primaryDark')};
        ${controlShadow(themeGet('colors.primary'))};
      }
    `
  )};

  ${controlTransition()};
  ${sizes};
  ${space};

  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
`;

Button.propTypes = {
  block: PropTypes.bool,
  circle: PropTypes.bool,
  ghost: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
  ...space.propTypes,
};

Button.defaultProps = {
  theme: {
    ...theme,
    buttonSizes,
  },
  size: 'm',
  block: false,
  circle: false,
  ghost: false,
};

export default Button;
