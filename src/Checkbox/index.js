import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { borderColor, color, themeGet } from 'styled-system';

import Label from '../Form/Label';
import { controlShadow } from '../utils/shadow';

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  opacity: 0;

  & + ${Label /* sc-selector */} {
    display: inline-block;
    position: relative;
    padding: 0;
    color: ${themeGet('colors.gray.3')} !important;
    cursor: pointer;
  }

  & + ${Label /* sc-selector */}::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: ${themeGet('space.1')};
    border: ${themeGet('borders.default')};
    border-radius: ${themeGet('radii.1')};
    background: white;
    vertical-align: text-bottom;
    ${p => p.theme.transition /* sc-declaration */};
    ${borderColor};
  }

  &:focus + ${Label /* sc-selector */}::before {
    ${controlShadow()};
  }

  &:checked + ${Label /* sc-selector */}::before {
    ${color};
  }

  &:disabled + ${Label /* sc-selector */} {
    opacity: 0.5;
    cursor: auto;
    pointer-events: none;
  }

  &:disabled + ${Label /* sc-selector */}::before {
    opacity: 0.5;
  }

  &:checked + ${Label /* sc-selector */}::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const Checkbox = props => <StyledCheckbox {...props} />;

Checkbox.propTypes = {
  /**
   * Specifies whether the checkbox is selected
   */
  checked: PropTypes.bool,
  /**
   * Disable checkbox
   */
  disabled: PropTypes.bool,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
  ...borderColor.propTypes,
  ...color.propTypes,
};

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => {},
  // eslint-disable-next-line react/default-props-match-prop-types
  bg: 'primary',
  // eslint-disable-next-line react/default-props-match-prop-types
  borderColor: 'primary',
};

export default Checkbox;
