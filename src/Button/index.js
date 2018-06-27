import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { themeGet, space } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  display: inline-block;
  position: relative;
  border: ${themeGet('borders.default')};
  border-radius: ${themeGet('radii.1')};
  border-color: ${themeGet('colors.primary')};
  background-color: ${themeGet('colors.primaryDark')};
  color: ${themeGet('colors.light')};
  line-height: ${themeGet('lineHeight')};
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &:focus {
    border-color: ${themeGet('colors.primaryDark')};
    outline: 0;
    ${controlShadow(themeGet('colors.primary'))};
  }

  &:hover {
    background-color: ${themeGet('colors.primary')};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
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
  })}

  ${ifProp(
    'block',
    css`
      width: 100%;
    `
  )}

  ${ifProp(
    'danger',
    css`
      border-color: ${themeGet('colors.error')};
      background-color: ${themeGet('colors.error')};
      color: ${themeGet('colors.light')};

      &:focus {
        border-color: ${themeGet('colors.error')};
        ${controlShadow(themeGet('colors.error'))};
      }

      &:hover {
        background-color: ${themeGet('colors.error')};
      }
    `
  )};

  ${ifProp(
    'light',
    css`
      border-color: ${themeGet('colors.gray.8')};
      background-color: ${themeGet('colors.light')};
      color: ${themeGet('colors.gray.2')};

      &:focus {
        border-color: ${themeGet('colors.primaryDark')};
        ${controlShadow(themeGet('colors.primary'))};
      }

      &:hover {
        background-color: ${themeGet('colors.gray.8')};
      }

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
        `
      )};
    `
  )};

  ${ifProp(
    'circle',
    css`
    border-radius: 999px;

    ${ifProp(
      { size: 'sm' },
      css`
        padding: ${themeGet('space.paddingYSm')}
          calc(${themeGet('space.paddingXSm')} * 2);
      `
    )}
    ${ifProp(
      { size: 'm' },
      css`
        padding: ${themeGet('space.paddingY')}
          calc(${themeGet('space.paddingX')} * 2);
      `
    )}
    ${ifProp(
      { size: 'lg' },
      css`
        padding: ${themeGet('space.paddingYLg')}
          calc(${themeGet('space.paddingXLg')} * 2);
      `
    )}
  `
  )}

  ${ifProp(
    'ghost',
    css`
      border-color: ${themeGet('colors.light')};
      background-color: transparent;

      &:focus {
        background-color: ${themeGet('colors.primary')};
        ${controlShadow(themeGet('colors.light'))};
      }
    `
  )}

  ${ifProp(
    'loading',
    css`
      color: transparent;
      pointer-events: none;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: calc(50% - (1em / 2));
        left: calc(50% - (1em / 2));
        width: 1em;
        height: 1em;
        border: 2px solid ${themeGet('colors.gray.6')};
        border-radius: 50%;
        border-top-color: transparent;
        border-right-color: transparent;
        animation: ${spin} 0.7s linear infinite;
      }
    `
  )}

  ${controlTransition()};

  ${space};
`;

Button.propTypes = {
  active: PropTypes.bool,
  block: PropTypes.bool,
  circle: PropTypes.bool,
  ghost: PropTypes.bool,
  light: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
  ...space.propTypes,
};

Button.defaultProps = {
  size: 'm',
  block: false,
  circle: false,
  ghost: false,
  light: false,
  active: false,
  loading: false,
};

export default Button;
