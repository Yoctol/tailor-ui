import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { borderColor, color, themeGet } from 'styled-system';

import Label from '../Form/Label';
import { controlShadow } from '../utils/shadow';

const StyledRadio = styled.input.attrs({
  type: 'radio',
})`
  position: absolute;
  opacity: 0;

  & + ${Label /* sc-selector */} {
    position: relative;
    padding: 0;
    color: ${themeGet('colors.gray.3')};
    cursor: pointer;
  }

  & + ${Label /* sc-selector */}::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: ${themeGet('space.1')};
    border: ${themeGet('borders.default')};
    border-radius: 999px;
    background: white;
    vertical-align: text-bottom;
    ${borderColor};
  }

  & + ${Label /* sc-selector */}::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    ${p => p.theme.transition /* sc-declaration */};
  }

  &:focus + ${Label /* sc-selector */}::before {
    ${controlShadow()};
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
    ${color};
  }
`;

const Radio = props => <StyledRadio {...props} />;

Radio.propTypes = {
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

Radio.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => {},
  // eslint-disable-next-line react/default-props-match-prop-types
  bg: 'primary',
  // eslint-disable-next-line react/default-props-match-prop-types
  borderColor: 'primary',
};

export default Radio;
