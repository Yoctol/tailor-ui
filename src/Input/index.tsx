import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  PureComponent,
  RefObject,
  createRef,
} from 'react';
import {
  SpaceProps,
  TextAlignProps,
  WidthProps,
  space,
  textAlign,
  themeGet,
  width,
} from 'styled-system';

import styled, { css } from 'utils/styled-components';

import { Omit } from '../utils/type';

export type Size = 'sm' | 'md' | 'lg';

export type StyledInputProps = WidthProps &
  SpaceProps &
  TextAlignProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    size?: Size;
  };

export const inputStyles = css<StyledInputProps>`
  display: block;
  width: 100%;
  max-width: 100%;
  border: ${themeGet('borders.base')};
  border-radius: ${themeGet('radii.base')};
  border-color: ${themeGet('colors.gray.8')};
  outline: none;
  background: ${themeGet('light')};
  background-image: none;
  color: ${themeGet('colors.gray.2')};
  line-height: ${themeGet('lineHeight')};
  appearance: none;

  &:focus {
    border-color: ${themeGet('colors.gray.3')};
  }

  &:disabled,
  [disabled] {
    border-color: ${themeGet('colors.gray.5')};
    opacity: 0.5;
    background-color: ${themeGet('colors.gray.8')};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${themeGet('colors.gray.6')};
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

export type InputProps = {
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
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
};

class Input extends PureComponent<InputProps> {
  inputRef: RefObject<HTMLInputElement> = createRef();

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
    return (
      <StyledInput
        innerRef={this.inputRef}
        onKeyPress={this.handleKeyPress}
        {...this.props}
      />
    );
  }
}

export default Input;
