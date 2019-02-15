import React, { FunctionComponent, MouseEvent, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { SpaceProps, space as styledSpace } from 'styled-system';

import Icon, { IconType, IconWrapper } from '../Icon';
import tag from '../utils/CleanTag';

import Ripple from './Ripple';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface GetTypesStylesInterface {
  type?: ButtonType;
  text?: boolean;
  outlined?: boolean;
}

const getTypeStyles = ({
  type = 'default',
  text,
  outlined,
  theme,
}: GetTypesStylesInterface & {
  theme: any;
}) => {
  const { colors } = theme;
  const mainColor = colors[type];

  if (text) {
    return {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: mainColor || colors.gray800,
      hover: {
        backgroundColor: colors.gray300,
        borderColor: 'transparent',
      },
    };
  }

  if (type === 'default') {
    return {
      borderColor: colors.gray300,
      backgroundColor: colors.light,
      color: colors.gray800,
      hover: {
        backgroundColor: colors.gray200,
        borderColor: colors.primary,
      },
    };
  }

  const { light } = colors;
  const backgroundColor = outlined ? 'transparent' : mainColor;

  return {
    borderColor: mainColor,
    backgroundColor,
    color: outlined ? mainColor : light,
    hover: {
      backgroundColor: outlined ? mainColor : light,
      color: outlined ? light : mainColor,
    },
  };
};

interface GetLoadingInterface extends GetTypesStylesInterface {
  loading?: boolean;
}

const getLoading = ({
  loading,
  ...props
}: GetLoadingInterface & {
  theme: any;
}) =>
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

type ButtonSize = 'sm' | 'md' | 'lg';

interface GetSizeInterface {
  size: ButtonSize;
  hasIcon?: boolean;
}

const getSize = css`
  ${({
    hasIcon,
    size,
    theme: { paddings, heights, fontSizes },
  }: GetSizeInterface & { theme: any }) => {
    if (hasIcon) {
      return {
        sm: css`
          width: ${heights.sm};
          height: ${heights.sm};
        `,
        md: css`
          width: ${heights.base};
          height: ${heights.base};
        `,
        lg: css`
          width: ${heights.lg};
          height: ${heights.lg};
        `,
      }[size];
    }

    return {
      sm: css`
        height: ${heights.sm};
        padding: 0 ${paddings.sm};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        height: ${heights.base};
        padding: 0 ${paddings.md};
        font-size: ${fontSizes.base};
      `,
      lg: css`
        height: ${heights.lg};
        padding: 0 ${paddings.lg};
        font-size: ${fontSizes.lg};
      `,
    }[size];
  }};
`;

interface BlockInterface {
  block?: boolean;
}

const getBlock = ({ block }: BlockInterface) =>
  block &&
  css`
    width: 100%;
  `;

interface RoundedInterface {
  rounded?: boolean;
}

const getRounded = ({ rounded }: RoundedInterface) =>
  rounded &&
  css`
    border-radius: 999px;
  `;

const getTypes = ({
  type = 'default',
  text = false,
  outlined = false,
  theme,
}: GetTypesStylesInterface & { theme: any }) => {
  const styles = getTypeStyles({ type, text, outlined, theme });

  return css`
    border-color: ${styles.borderColor};
    background-color: ${styles.backgroundColor};
    color: ${styles.color};

    ${IconWrapper /* sc-selector */} {
      cursor: pointer;
      svg {
        fill: ${styles.color};
      }
    }

    &:hover {
      border-color: ${styles.hover.borderColor};
      background-color: ${styles.hover.backgroundColor};
      color: ${styles.hover.color};

      ${IconWrapper /* sc-selector */} svg {
        fill: ${styles.hover.color};
      }
    }
  `;
};

type StyledButtonProps = GetTypesStylesInterface &
  GetLoadingInterface &
  GetSizeInterface &
  BlockInterface &
  RoundedInterface &
  SpaceProps;

export const StyledButton = styled(tag.button)<StyledButtonProps>`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
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
      flex: none;
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

export type ButtonProps = SpaceProps & {
  type?: ButtonType;
  text?: boolean;
  block?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconType;
  size?: ButtonSize;
  onClick?: (event: MouseEvent) => void;
};

const Button: FunctionComponent<ButtonProps> = ({
  children,
  icon,
  loading = false,
  type = 'default',
  size = 'md',
  ...props
}) => {
  const rippleRef = useRef<Ripple>(null);
  const buttonRef = useRef<any>(null);

  const handleRippling = (event: MouseEvent) => {
    if (rippleRef.current && buttonRef.current) {
      rippleRef.current.startRipple(event, buttonRef.current);
    }
  };

  return (
    <StyledButton
      ref={buttonRef}
      onMouseUp={handleRippling}
      hasIcon={Boolean(icon && !children)}
      loading={loading}
      size={size}
      type={type}
      {...props}
    >
      {!loading && icon && (
        <Icon
          type={icon}
          size="20"
          mr={children ? 1 : 0}
          style={{ pointerEvents: 'none' }}
        />
      )}
      {children}
      <Ripple ref={rippleRef} />
    </StyledButton>
  );
};

export default Button;
