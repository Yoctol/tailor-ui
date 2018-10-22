import React, {
  MouseEvent,
  PureComponent,
  ReactInstance,
  RefObject,
  createRef,
} from 'react';
import { SpaceProps, space as styledSpace } from 'styled-system';

import styled, { css, keyframes } from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Icon, { IconType, IconWrapper } from '../Icon';

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

export interface IGetTypesStylesInterface {
  type?: ButtonType;
  text?: boolean;
  outlined?: boolean;
}

const getTypeStyles = ({
  type = 'default',
  text,
  outlined,
  theme,
}: IGetTypesStylesInterface & {
  theme: any;
}) => {
  const { colors } = theme;

  if (text) {
    return {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: colors.gray800,
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

  const bg = colors[type];
  const { light } = colors;
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

interface IGetLoadingInterface extends IGetTypesStylesInterface {
  loading?: boolean;
}

const getLoading = ({
  loading,
  ...props
}: IGetLoadingInterface & {
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

interface IGetSizeInterface {
  size: ButtonSize;
  hasIcon?: boolean;
}

const getSize = css`
  ${({
    hasIcon,
    size,
    theme: { paddings, heights, fontSizes },
  }: IGetSizeInterface & { theme: any }) => {
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

interface IBlockInterface {
  block?: boolean;
}

const getBlock = ({ block }: IBlockInterface) =>
  block &&
  css`
    width: 100%;
  `;

interface IRoundedInterface {
  rounded?: boolean;
}

const getRounded = ({ rounded }: IRoundedInterface) =>
  rounded &&
  css`
    border-radius: 999px;
  `;

const getTypes = ({
  type = 'default',
  text = false,
  outlined = false,
  theme,
}: IGetTypesStylesInterface & { theme: any }) => {
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

type StyledButtonProps = IGetTypesStylesInterface &
  IGetLoadingInterface &
  IGetSizeInterface &
  IBlockInterface &
  IRoundedInterface &
  SpaceProps;

export const StyledButton = styled<StyledButtonProps, 'button'>(tag.button)`
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
  icon?: string | IconType;
  size?: ButtonSize;
  onClick?: (event: MouseEvent) => void;
};

class Button extends PureComponent<ButtonProps> {
  ripple: RefObject<Ripple> = createRef<Ripple>();

  buttonRef: ReactInstance | null = null;

  handleButtonRef = (ref: any) => {
    this.buttonRef = ref;
  };

  handleClick = (event: MouseEvent) => {
    if (this.ripple.current && this.buttonRef) {
      this.ripple.current.startRipple(event, this.buttonRef);
    }
  };

  render() {
    const {
      children,
      icon,
      loading = false,
      type = 'default',
      size = 'md',
      ...props
    } = this.props;

    return (
      <StyledButton
        ref={this.handleButtonRef}
        onMouseUp={this.handleClick}
        hasIcon={Boolean(icon && !children)}
        loading={loading}
        size={size}
        type={type}
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
        {children}
        <Ripple ref={this.ripple} />
      </StyledButton>
    );
  }
}

export default Button;
