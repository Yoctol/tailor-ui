import PropTypes from 'prop-types';
import React, { PureComponent, createRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { __, compose, path, prop, split } from 'ramda';
import { space as styledSpace } from 'styled-system';

import Icon, { IconWrapper } from '../Icon';

import Ripple from './Ripple';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const getTypeStyles = ({ type, text, outlined, theme }) => {
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

const getLoading = ({ loading, ...props }) =>
  loading &&
  css`
    opacity: 0.7;
    cursor: default;
    pointer-events: none;

    &::before {
      width: 1em;
      height: 1em;
      margin-right: 8px;
      border: 1px solid ${getTypeStyles(props).color};
      border-radius: 50%;
      border-top-color: transparent;
      border-right-color: transparent;
      animation: ${spin} 0.7s linear infinite;
    }
  `;

const getSize = css`
  ${({ onlyIcon, size, theme: { space, fontSizes } }) => {
    if (onlyIcon) {
      return {
        sm: css`
          width: 28px;
          height: 28px;
        `,
        md: css`
          width: 36px;
          height: 36px;
        `,
        lg: css`
          width: 40px;
          height: 40px;
        `,
      }[size];
    }

    return {
      sm: css`
        padding: ${space.paddingYSm} ${space.paddingXSm};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        padding: ${space.paddingY} ${space.paddingX};
        font-size: ${fontSizes.default};
      `,
      lg: css`
        padding: ${space.paddingYLg} ${space.paddingXLg};
        font-size: ${fontSizes.lg};
      `,
    }[size];
  }};

  ${({ rounded, onlyIcon, size, theme: { space } }) => {
    if (rounded && !onlyIcon) {
      return {
        sm: css`
          padding: ${space.paddingYSm} calc(${space.paddingXSm} * 2);
        `,
        md: css`
          padding: ${space.paddingY} calc(${space.paddingX} * 2);
        `,
        lg: css`
          padding: ${space.paddingYLg} calc(${space.paddingXLg} * 2);
        `,
      }[size];
    }
  }};
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

const getTypes = ({ type, text, outlined, theme }) => {
  const styles = getTypeStyles({ type, text, outlined, theme });

  return css`
    border-color: ${styles.borderColor};
    background-color: ${styles.backgroundColor};
    color: ${styles.color};

    ${IconWrapper} svg {
      fill: ${styles.color};
    }

    &:hover {
      border-color: ${styles.hover.borderColor};
      background-color: ${styles.hover.backgroundColor};
      color: ${styles.hover.color};

      ${IconWrapper} svg {
        fill: ${styles.hover.color};
      }
    }
  `;
};

const StyledButton = styled.button`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: ${p => p.theme.borders.default};
  border-radius: ${p => p.theme.radii[1]};
  line-height: ${p => p.theme.lineHeight};
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
    opacity: 0.7;
    cursor: default;
    pointer-events: none;
  }

   &::before {
      content: '';
      display: inline-block;
      position: relative;
      left: 0;
      width: 0;
      height: 0;
      margin-right: 0;
      ${p => p.theme.transition /* sc-declaration */};
    }

  ${getBlock /* sc-declaration */}
  ${getRounded /* sc-declaration */}
  ${getSize /* sc-declaration */}
  ${getTypes /* sc-declaration */}
  ${getLoading /* sc-declaration */};

  ${p => p.theme.transition /* sc-declaration */};
  ${styledSpace};
`;

class Button extends PureComponent {
  ripple = createRef();

  button = createRef();

  handleClick = e => this.ripple.current.startRipple(e, this.button);

  render() {
    const { children, icon, loading, ...props } = this.props;
    return (
      <StyledButton
        innerRef={this.button}
        onMouseUp={this.handleClick}
        onTouchend={this.handleClick}
        onlyIcon={icon && !children}
        loading={loading}
        {...props}
      >
        {!loading &&
          icon && (
            <Icon
              type={icon}
              size="20"
              mr={children ? 1 : 0}
              style={{ pointerEvents: 'none' }}
            />
          )}
        {loading ? 'Loading' : children}
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
   * set the icon of button, see: Icon component
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  ...styledSpace.propTypes,
};

Button.defaultProps = {
  type: 'default',
  size: 'md',
  text: false,
  outlined: false,
  rounded: false,
  block: false,
  loading: false,
  icon: null,
};

export default Button;
