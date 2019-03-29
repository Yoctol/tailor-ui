import styled, { css } from 'styled-components';
import {
  SpaceProps,
  TextAlignProps,
  WidthProps,
  space,
  textAlign,
  width,
} from 'styled-system';

import { StyledButton } from '../Button';

export type Size = 'sm' | 'md' | 'lg';

export type StyledInputProps = WidthProps &
  SpaceProps &
  TextAlignProps & {
    invalid?: boolean;
    size?: Size;
  };

export const inputStyles = css<StyledInputProps>`
  display: block;
  width: 100%;
  max-width: 100%;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray400};
  outline: none;
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray700};
  line-height: ${p => p.theme.lineHeight};
  appearance: none;

  &:hover {
    border-color: ${p => p.theme.colors.primary};
  }

  &:focus {
    border-color: ${p => p.theme.colors.primary};
    box-shadow: inset 0 0 0 2px ${p => p.theme.colors.surface};
  }

  &:disabled,
  [disabled] {
    border-color: ${p => p.theme.colors.gray400};
    background-color: ${p => p.theme.colors.gray300};
    color: ${p => p.theme.colors.gray500};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${p => p.theme.colors.gray400};
  }

  ${p =>
    p.invalid &&
    css`
      border-color: ${p.theme.colors.danger} !important;
      box-shadow: none !important;
    `}

  ${({ size = 'md', theme: { paddings, heights, fontSizes } }) => {
    const inputSizeStyles = {
      sm: css`
        height: ${heights.sm};
        padding: 1px ${paddings.xs};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        height: ${heights.base};
        padding: 4px ${paddings.sm};
        font-size: ${fontSizes.base};
      `,
      lg: css`
        height: ${heights.lg};
        padding: 6px ${paddings.md};
        font-size: ${fontSizes.lg};
      `,
    };

    return inputSizeStyles[size];
  }};

  ${p => p.theme.transition /* sc-declaration */};

  ${width};
  ${space};
  ${textAlign};
`;

export const StyledInput = styled.input`
  ${inputStyles};
`;

export const InputLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${p => p.theme.space[2]};
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  border-color: ${p => p.theme.colors.gray300};
  background-color: ${p => p.theme.colors.gray200};
  font-size: ${p => p.theme.fontSizes.base};
  line-height: 1;
`;

interface InputWrapperProps {
  prefix?: any;
  suffix?: any;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;

  ${p =>
    p.prefix &&
    css`
      ${StyledInput /* sc-selector */} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      ${InputLabel /* sc-selector */}:first-child {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `};

  ${p =>
    p.suffix &&
    css`
      ${StyledInput /* sc-selector */} {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      ${InputLabel /* sc-selector */}:last-child {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      ${StyledButton /* sc-selector */} {
        flex: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    `};

  ${space};
  ${width};
`;
