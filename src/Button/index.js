import PropTypes from 'prop-types';
import React, { PureComponent, createRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { __, compose, path, prop, split } from 'ramda';
import { ifProp, switchProp } from 'styled-tools';
import { readableColor } from 'polished';
import { space, themeGet } from 'styled-system';

import controlTransition from '../utils/transition';

import Ripple from './Ripple';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const getLoading = ({ loading, type, theme }) =>
  loading &&
  css`
    color: transparent;
    cursor: default;
    pointer-events: none;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - (1em / 2));
      left: calc(50% - (1em / 2));
      width: 1em;
      height: 1em;
      border: 1px solid
        ${readableColor(theme.colors[type] || theme.colors.light)};
      border-radius: 50%;
      border-top-color: transparent;
      border-right-color: transparent;
      animation: ${spin} 0.7s linear infinite;
    }
  `;

const getSize = css`
  ${switchProp('size', {
    sm: css`
      padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
      font-size: ${themeGet('fontSizes.sm')};
    `,
    md: css`
      padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
      font-size: ${themeGet('fontSizes.default')};
    `,
    lg: css`
      padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
      font-size: ${themeGet('fontSizes.lg')};
    `,
  })};

  ${ifProp(
    'rounded',
    switchProp('size', {
      sm: css`
        padding: ${themeGet('space.paddingYSm')}
          calc(${themeGet('space.paddingXSm')} * 2);
      `,

      md: css`
        padding: ${themeGet('space.paddingY')}
          calc(${themeGet('space.paddingX')} * 2);
      `,

      lg: css`
        padding: ${themeGet('space.paddingYLg')}
          calc(${themeGet('space.paddingXLg')} * 2);
      `,
    })
  )};
`;

const getBlock = ({ block }) =>
  block &&
  css`
    width: 100%;
  `;

const getRounded = ({ rounded }) =>
  rounded &&
  css`
    border-radius: 999px;
  `;

const getTypesStyles = ({ type, text, outlined, theme }) => {
  const getColor = compose(
    path(__, prop('colors', theme)),
    split('.')
  );

  if (text) {
    return {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: getColor('dark'),
      hover: {
        backgroundColor: getColor('gray.8'),
        borderColor: 'transparent',
      },
    };
  }

  if (type === 'default') {
    return {
      borderColor: getColor('gray.7'),
      backgroundColor: getColor('light'),
      color: getColor('dark'),
      hover: {
        backgroundColor: getColor('gray.8'),
        borderColor: getColor('primary'),
      },
    };
  }

  const bg = getColor(type);
  const light = getColor('light');
  const backgroundColor = outlined ? 'transparent' : bg;

  return {
    borderColor: bg,
    backgroundColor,
    color: outlined ? bg : light,
    hover: {
      backgroundColor: outlined ? bg : light,
      color: outlined ? light : bg,
    },
  };
};

const getTypes = ({ type, text, outlined, theme }) => {
  const styles = getTypesStyles({ type, text, outlined, theme });

  return css`
    border-color: ${styles.borderColor};
    background-color: ${styles.backgroundColor};
    color: ${styles.color};

    &:hover {
      border-color: ${styles.hover.borderColor};
      background-color: ${styles.hover.backgroundColor};
      color: ${styles.hover.color};
    }
  `;
};

const StyledButton = styled.button`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: ${themeGet('borders.default')};
  border-radius: ${themeGet('radii.1')};
  line-height: ${themeGet('lineHeight')};
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &:focus {
    outline: 0;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  ${controlTransition()};

  ${getBlock /* sc-declaration */}
  ${getRounded /* sc-declaration */}
  ${getSize /* sc-declaration */}
  ${getTypes /* sc-declaration */}
  ${getLoading /* sc-declaration */};

  ${space};
`;

class Button extends PureComponent {
  ripple = createRef();

  button = createRef();

  handleClick = e => this.ripple.current.startRipple(e, this.button);

  render() {
    const { children, ...props } = this.props;
    return (
      <StyledButton
        innerRef={this.button}
        onMouseUp={this.handleClick}
        onTouchend={this.handleClick}
        {...props}
      >
        {children}
        <Ripple ref={this.ripple} />
      </StyledButton>
    );
  }
}

Button.displayName = 'Button';

Button.propTypes = {
  /**
   * Set the button width to 100%
   */
  block: PropTypes.bool,
  /**
   * Set the loading status of button
   */
  loading: PropTypes.bool,
  /**
   * Outlined button
   */
  outlined: PropTypes.bool,
  /**
   * Rounded button
   */
  rounded: PropTypes.bool,
  /**
   * Can be set to `sm` `md` `lg` or omitted (meaning `md`)
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Text button
   */
  text: PropTypes.bool,
  /**
   * Can be set to `default`, `primary` `secondary` `info` `success` `warning` `danger` or omitted (meaning `primary`)
   */
  type: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  ...space.propTypes,
};

Button.defaultProps = {
  type: 'default',
  size: 'md',
  text: false,
  outlined: false,
  rounded: false,
  block: false,
  loading: false,
};

export default Button;
