import React, {
  FunctionComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  forwardRef,
  isValidElement,
  useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import {
  SpaceProps,
  TextAlignProps,
  WidthProps,
  space,
  textAlign,
  width,
} from 'styled-system';

import { Omit } from '../utils/type';
import { StyledButton } from '../Button';

export type Size = 'sm' | 'md' | 'lg';

export type StyledInputProps = WidthProps &
  SpaceProps &
  TextAlignProps & {
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

const InputLabel = styled.span`
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

interface InputLabel {
  prefix?: any;
  suffix?: any;
}

const InputWrapper = styled.div<InputLabel>`
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

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /**
   * Auto select value of the input if true
   */
  autoSelect?: boolean;
  /**
   * The size of the input box
   */
  size?: Size;
  /**
   * The callback function that is triggered when Enter key is pressed
   */
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  /**
   * The label text displayed before (on the right side of) the input field.
   */
  prefix?: ReactNode;
  /**
   * The label text displayed after (on the right side of) the input field.
   */
  suffix?: ReactNode;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
};

const Input: FunctionComponent<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      prefix,
      suffix,
      size = 'md',
      onPressEnter,
      onKeyPress,
      autoSelect,
      autoFocus,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (autoSelect && ref) {
        (ref as any).select();
      }
    }, [autoSelect, ref]);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyPress) {
        onKeyPress(event);
      }

      if (onPressEnter && event.key === 'Enter') {
        onPressEnter(event);
      }
    };

    const input = (
      <StyledInput
        ref={ref}
        size={size as any}
        onKeyPress={handleKeyPress}
        autoFocus={autoFocus || autoSelect}
        {...props}
      />
    );

    if (prefix || suffix) {
      return (
        <InputWrapper prefix={prefix} suffix={suffix}>
          {prefix && <InputLabel>{prefix}</InputLabel>}
          {input}
          {suffix &&
            (isValidElement(suffix) ? (
              suffix
            ) : (
              <InputLabel>{suffix}</InputLabel>
            ))}
        </InputWrapper>
      );
    }

    return input;
  }
);

export default Input;
