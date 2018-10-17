import React, {
  KeyboardEvent,
  KeyboardEventHandler,
  PureComponent,
  ReactNode,
  createRef,
  isValidElement,
} from 'react';
import {
  SpaceProps,
  TextAlignProps,
  WidthProps,
  space,
  textAlign,
  width,
} from 'styled-system';

import styled, { css } from 'utils/styled-components';

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

export const StyledInput = styled<StyledInputProps, any>('input')`
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

const InputWrapper = styled<IInputLabel, 'div'>('div')`
  display: flex;

  ${p =>
    p.prefix &&
    css`
      ${StyledInput} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      ${InputLabel}:first-child {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `};

  ${p =>
    p.suffix &&
    css`
      ${StyledInput} {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      ${InputLabel}:last-child {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      ${StyledButton} {
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

class Input extends PureComponent<IInputProps> {
  static defaultProps = {
    prefix: null,
    suffix: null,
  };

  inputRef: any = createRef();

  componentDidMount() {
    const { autoSelect = false } = this.props;

    if (autoSelect && this.inputRef.current) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyPress } = this.props;

    if (onKeyPress) {
      onKeyPress(event);
    }

    if (onPressEnter && event.key === 'Enter') {
      onPressEnter(event);
    }
  };

  render() {
    const { prefix, suffix, ...props } = this.props;

    if (prefix || suffix) {
      return (
        <InputWrapper prefix={prefix} suffix={suffix} {...props}>
          {prefix && <InputLabel>{prefix}</InputLabel>}
          <StyledInput ref={this.inputRef} onKeyPress={this.handleKeyPress} />
          {suffix &&
            (isValidElement(suffix) ? (
              suffix
            ) : (
              <InputLabel>{suffix}</InputLabel>
            ))}
        </InputWrapper>
      );
    }

    return (
      <StyledInput
        ref={this.inputRef}
        onKeyPress={this.handleKeyPress}
        {...props}
      />
    );
  }
}

export default Input;
