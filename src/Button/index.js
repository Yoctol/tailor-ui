import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';
import { sizes } from '../utils/system';
import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';

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
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

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
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  ${ifProp(
    'ghost',
    css`
      border-color: ${themeGet('colors.light')};
      background-color: transparent;
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
              border-color: ${themeGet('colors.secondaryDark')};
              background-color: ${themeGet('colors.secondaryDark')};
              color: ${themeGet('colors.light')};

              &:hover {
                background-color: ${themeGet('colors.secondary')};
              }

              &:focus {
                border-color: ${themeGet('colors.secondaryDark')};
              }
            `,
            css`
              border-color: ${themeGet('colors.border')};
              background-color: ${themeGet('colors.bgLight')};

              &:focus {
                border-color: ${themeGet('colors.primaryDark')};
                ${controlShadow(themeGet('colors.primary'))};
              }
            `
          )};
        `,
        css`
          border-color: ${themeGet('colors.primary')};
          background-color: ${themeGet('colors.primaryDark')};

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
  theme,
  size: 'm',
  block: false,
  circle: false,
  ghost: false,
  light: false,
  active: false,
};

export default Button;
