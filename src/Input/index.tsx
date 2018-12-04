import React, {
  FunctionComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeMethods,
  useRef,
} from 'react';
import {
  SpaceProps,
  TextAlignProps,
  WidthProps,
  space,
  textAlign,
  width,
} from 'styled-system';
import { omit } from 'ramda';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';

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
  border-color: ${p => p.theme.colors.gray300};
  outline: none;
  background: ${p => p.theme.colors.light};
  background-image: none;
  color: ${p => p.theme.colors.gray700};
  line-height: ${p => p.theme.lineHeight};
  appearance: none;

  &:hover {
    border-color: ${p => p.theme.colors.gray500};
  }

  &:focus {
    border-color: ${p => p.theme.colors.primaryDark};
  }

  &:disabled,
  [disabled] {
    border-color: ${p => p.theme.colors.gray500};
    opacity: 0.5;
    background-color: ${p => p.theme.colors.gray300};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${p => p.theme.colors.gray400};
  }

  ${({ size = 'md', theme: { paddings, heights, fontSizes } }) =>
    ({
      sm: css`
        height: ${heights.sm};
        padding: 1px ${paddings.xs};
        font-size: ${fontSizes.sm};
      `,
      md: css`
        height: ${heights.base};
        padding: 4px ${paddings.xs};
        font-size: ${fontSizes.base};
      `,
      lg: css`
        height: ${heights.lg};
        padding: 6px ${paddings.xs};
        font-size: ${fontSizes.lg};
      `,
    }[size])};

  ${p => p.theme.transition /* sc-declaration */};

  ${width};
  ${space};
  ${textAlign};
`;

export const StyledInput = styled<StyledInputProps, any>(tag.input)`
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

interface IInputLabel {
  prefix?: any;
  suffix?: any;
}

const InputWrapper = styled<IInputLabel, 'div'>(tag.div)`
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

export interface IInputProps {
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
  [key: string]: any;
}

const Input: FunctionComponent<IInputProps> = forwardRef(
  (
    {
      prefix,
      suffix,
      onPressEnter,
      onKeyPress,
      autoSelect,
      autoFocus,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<any>(null);

    useImperativeMethods(ref, () => ({
      focus: () => inputRef.current.focus(),
      blur: () => inputRef.current.blur(),
    }));

    useEffect(
      () => {
        if (autoSelect && inputRef.current) {
          inputRef.current.select();
        }
      },
      [autoSelect]
    );

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyPress) {
        onKeyPress(event);
      }

      if (onPressEnter && event.key === 'Enter') {
        onPressEnter(event);
      }
    };

    const otherProps = omit(['onPressEnter'], props);

    const input = (
      <StyledInput
        ref={inputRef}
        onKeyPress={handleKeyPress}
        autoFocus={autoFocus || autoSelect}
        {...otherProps}
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
