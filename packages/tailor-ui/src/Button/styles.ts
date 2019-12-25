import styled, { css, keyframes } from 'styled-components';
import { SpaceProps, WidthProps, space, width } from 'styled-system';
import { darken, lighten } from 'polished';

import { IconWrapper } from '../Icon';

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const buttonLoading = ({ isLoading }: { isLoading: boolean }) =>
  isLoading &&
  css`
    opacity: 0.5;
    cursor: default;
    pointer-events: none;

    &::before {
      width: 1em;
      height: 1em;
      margin-right: 8px;
      border: ${p => p.theme.borders.base};
      border-radius: 50%;
      border-top-color: transparent;
      border-right-color: transparent;
      animation: ${spin} 0.7s linear infinite;
    }
  `;

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant =
  | 'primary'
  | 'primary-invert'
  | 'danger'
  | 'danger-invert'
  | 'regular'
  | 'normal';

const buttonSize = css<{
  size: ButtonSize;
  hasIcon: boolean;
}>`
  ${({ hasIcon, size = 'md', theme: { paddings, heights, fontSizes } }) => {
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
        padding: 0 ${paddings.xs};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        height: ${heights.base};
        padding: 0 ${paddings.sm};
        font-size: ${fontSizes.base};
      `,
      lg: css`
        height: ${heights.lg};
        padding: 0 ${paddings.md};
        font-size: ${fontSizes.lg};
      `,
    }[size];
  }};
`;

export const buttonVariant = ({ variant }: { variant?: ButtonVariant }) => {
  switch (variant) {
    default:
      return css`
        border-color: ${p => p.theme.colors.gray300};
        background-color: ${p => p.theme.colors.light};
        color: ${p => p.theme.colors.gray700};

        &::before {
          border-color: ${p => p.theme.colors.gray700};
        }

        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.gray400};
        }

        &:hover {
          border-color: ${p => p.theme.colors.primaryLight};
        }

        &:active {
          border-color: ${p => p.theme.colors.primary};
          color: ${p => p.theme.colors.primary};

          ${IconWrapper} svg {
            fill: ${p => p.theme.colors.primary};
          }
        }
      `;
    case 'primary':
      return css`
        background-color: ${p => p.theme.colors.primary};
        color: ${p => p.theme.colors.light};
        font-weight: bold;

        /* stylelint-disable-next-line no-descending-specificity */
        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.light};
        }

        &:hover {
          background-color: ${p => lighten(0.05, p.theme.colors.primary)};
        }

        &:active {
          background-color: ${p => darken(0.05, p.theme.colors.primary)};
        }
      `;
    case 'primary-invert':
      return css`
        background-color: ${p => p.theme.colors.light};
        color: ${p => p.theme.colors.primary};
        font-weight: bold;

        &::before {
          border-color: ${p => p.theme.colors.primary};
        }

        /* stylelint-disable-next-line no-descending-specificity */
        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.primary};
        }

        &:hover {
          color: ${p => lighten(0.05, p.theme.colors.primary)};

          ${IconWrapper} svg {
            fill: ${p => lighten(0.05, p.theme.colors.primary)};
          }
        }

        &:active {
          background-color: ${p => p.theme.colors.gray200};
          color: ${p => darken(0.05, p.theme.colors.primary)};

          ${IconWrapper} svg {
            fill: ${p => darken(0.05, p.theme.colors.primary)};
          }
        }
      `;
    case 'danger':
      return css`
        background-color: ${p => p.theme.colors.danger};
        color: ${p => p.theme.colors.light};
        font-weight: bold;

        /* stylelint-disable-next-line no-descending-specificity */
        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.light};
        }

        &:hover {
          background-color: ${p => lighten(0.05, p.theme.colors.danger)};
        }

        &:active {
          background-color: ${p => darken(0.05, p.theme.colors.danger)};
        }
      `;
    case 'danger-invert':
      return css`
        background-color: ${p => p.theme.colors.light};
        color: ${p => p.theme.colors.danger};
        font-weight: bold;

        &::before {
          border-color: ${p => p.theme.colors.danger};
        }

        /* stylelint-disable-next-line no-descending-specificity */
        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.danger};
        }

        &:hover {
          color: ${p => lighten(0.05, p.theme.colors.danger)};

          ${IconWrapper} svg {
            fill: ${p => lighten(0.05, p.theme.colors.danger)};
          }
        }

        &:active {
          background-color: ${p => p.theme.colors.gray200};
          color: ${p => darken(0.05, p.theme.colors.danger)};

          ${IconWrapper} svg {
            fill: ${p => darken(0.05, p.theme.colors.danger)};
          }
        }
      `;
    case 'regular':
      return css`
        background-color: ${p => p.theme.colors.primaryLight};
        color: ${p => p.theme.colors.light};
        font-weight: bold;

        /* stylelint-disable-next-line no-descending-specificity */
        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.light};
        }

        &:hover {
          background-color: ${p => lighten(0.05, p.theme.colors.primaryLight)};
        }

        &:active {
          background-color: ${p => darken(0.05, p.theme.colors.primaryLight)};
        }
      `;
    case 'normal':
      return css`
        background-color: ${p => p.theme.colors.surface};
        color: ${p => p.theme.colors.primaryLight};
        font-weight: bold;

        /* stylelint-disable-next-line no-descending-specificity */
        ${IconWrapper} svg {
          fill: ${p => p.theme.colors.primaryLight};
        }

        &:hover {
          background-color: ${p => lighten(0.05, p.theme.colors.surface)};
        }

        &:active {
          background-color: ${p => darken(0.05, p.theme.colors.surface)};
        }
      `;
  }
};

export type StyledButtonProps = SpaceProps &
  WidthProps & {
    isLoading: boolean;
    hasIcon: boolean;
    size: ButtonSize;
    variant?: ButtonVariant;
    rounded?: boolean;
    disabled?: boolean;
  };

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.lg};
  border-color: transparent;
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
    opacity: 0.85;
    background-color: ${p => p.theme.colors.gray300};
    color: ${p => p.theme.colors.gray500};
    cursor: default;
    pointer-events: none;

    ${IconWrapper} svg {
      fill: ${p => p.theme.colors.gray500};
    }
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

  ${p =>
    p.rounded &&
    css`
      border-radius: 999px;
    `};

  ${p => p.theme.transition /* sc-declaration */};
  ${buttonSize /* sc-declaration */}
  ${buttonVariant /* sc-declaration */}
  ${buttonLoading /* sc-declaration */};

  ${space};
  ${width};
`;
