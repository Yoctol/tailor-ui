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
  color: ${ifProp(
    'light',
    themeGet('colors.bodyFont'),
    themeGet('colors.light')
  )};
  line-height: ${themeGet('lineHeight')};
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: ${ifProp(
      'light',
      themeGet('colors.gray.8'),
      themeGet('colors.primary')
    )};
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
      ${ifProp(
        'light',
        css`
          border-color: ${themeGet('colors.border')};
          ${ifProp(
            'active',
            css`
              color: ${themeGet('colors.light')};
              background-color: ${themeGet('colors.secondaryDark')};
              border-color: ${themeGet('colors.secondaryDark')};

              &:hover {
                background-color: ${themeGet('colors.secondary')};
              }

              &:focus {
                border-color: ${themeGet('colors.secondaryDark')};
              }
            `,
            css`
              background-color: ${themeGet('colors.bgLight')};
              border-color: ${themeGet('colors.border')};

              &:focus {
                border-color: ${themeGet('colors.primaryDark')};
                ${controlShadow(themeGet('colors.primary'))};
              }
            `
          )};
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
  active: PropTypes.bool,
  block: PropTypes.bool,
  circle: PropTypes.bool,
  ghost: PropTypes.bool,
  light: PropTypes.bool,
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
  light: false,
  active: false,
};

export default Button;
