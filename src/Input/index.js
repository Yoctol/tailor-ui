import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { composeEvents } from 'react-powerplug';
import {
  space as styledSpace,
  textAlign,
  themeGet,
  width,
} from 'styled-system';

export const inputStyles = css`
  display: block;
  width: 100%;
  max-width: 100%;
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
  border-radius: ${themeGet('radii.1')};
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
    opacity: 0.5;
    background-color: ${themeGet('colors.gray.8')};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${themeGet('colors.gray.6')};
    font-size: 0.8rem;
  }

  ${({ size, theme: { space, fontSizes } }) =>
    ({
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
    }[size])};

  ${p => p.theme.transition /* sc-declaration */};

  ${width};
  ${styledSpace};
  ${textAlign};
`;

export const StyledInput = styled.input`
  ${inputStyles};
`;

class Input extends PureComponent {
  componentDidMount() {
    const { autoSelect } = this.props;

    if (autoSelect) {
      this.ref.focus();
      this.ref.select();
    }
  }

  handleRef = ref => {
    this.ref = ref;
  };

  onKeyPress = event => {
    const { onPressEnter } = this.props;

    if (onPressEnter && event.key === 'Enter') {
      onPressEnter(event);
    }
  };

  render() {
    return (
      <StyledInput
        innerRef={this.handleRef}
        {...this.props}
        {...composeEvents(this.props, { onKeyPress: this.onKeyPress })}
      />
    );
  }
}

Input.propTypes = {
  /**
   * Auto select value of the input if true
   */
  autoSelect: PropTypes.bool,
  /**
   * The size of the input box
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The callback function that is triggered when Enter key is pressed
   */

  onPressEnter: PropTypes.func,
  ...width.propTypes,
  ...styledSpace.propTypes,
  ...textAlign.propTypes,
};

Input.defaultProps = {
  size: 'md',
  autoSelect: false,
  onPressEnter: null,
};

export default Input;
