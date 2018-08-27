import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { composeEvents } from 'react-powerplug';
import { space, textAlign, themeGet, width } from 'styled-system';

import { sizes } from '../utils/system';

export const StyledInput = styled.input`
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

  ${p => p.theme.transition /* sc-declaration */};

  ${sizes};
  ${width};
  ${space};
  ${textAlign};
`;

const Input = ({ onPressEnter, ...props }) => {
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      onPressEnter(event);
    }
  };

  return <StyledInput {...props} {...composeEvents(props, { onKeyPress })} />;
};

Input.propTypes = {
  /**
   * The size of the input box
   */
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
  /**
   * The callback function that is triggered when Enter key is pressed
   */
  onPressEnter: PropTypes.func,
  ...width.propTypes,
  ...space.propTypes,
  ...textAlign.propTypes,
};

Input.defaultProps = {
  size: 'm',
  onPressEnter: () => {},
};

export default Input;
