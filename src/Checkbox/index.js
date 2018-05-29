import React from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import styled from 'styled-components';
import { themeGet, width, height, color, borderColor } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';

const CheckboxWrapper = styled.span`
  .rc-checkbox {
    display: inline-block;
    position: relative;
    outline: none;
    line-height: 1;
  }

  .rc-checkbox-inner {
    display: inline-block;
    position: relative;
    top: 0;
    left: 0;
    border: 1px solid
      ${ifProp(
        'disabled',
        themeGet('colors.gray.8'),
        props => themeGet(`colors.${props.borderColor}`) || props.borderColor
      )};
    border-radius: ${ifProp('circle', props => +props.height / 2, '3')}px;
    background-color: #fff;

    ${width};
    ${height};
  }

  .rc-checkbox-inner::after {
    content: ' ';
    display: table;
    position: absolute;
    top: ${props => (+props.height - 11) / 2}px;
    left: ${props => (+props.height - 7) / 2}px;
    width: 5px;
    height: 8px;
    border-top: 0;
    border-left: 0;
    border-radius: ${themeGet('radii.1')};
    transform: rotate(45deg);
  }

  .rc-checkbox-input {
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: ${ifProp('disabled', 'default', 'pointer')};

    ${width};
    ${height};
  }

  .rc-checkbox-checked .rc-checkbox-inner {
    ${borderColor};
    ${color};
  }

  .rc-checkbox-checked .rc-checkbox-inner::after {
    content: ' ';
    display: table;
    position: absolute;
    top: ${props => (+props.height - 11) / 2}px;
    left: ${props => (+props.height - 7) / 2}px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg);
  }

  .rc-checkbox-disabled .rc-checkbox-inner::after {
    border-color: #f3f3f3;
  }

  .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner::after {
    border-color: #ccc;
  }

  .rc-checkbox-disabled .rc-checkbox-inner {
    border-color: #d9d9d9;
    background-color: #f3f3f3;
  }
`;

CheckboxWrapper.propTypes = {
  circle: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  ...borderColor.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...height.propTypes,
};

CheckboxWrapper.defaultProps = {
  theme,
  borderColor: 'primary',
  bg: 'primary',
  height: 19,
  width: 19,
};

const Checkbox = ({
  circle,
  disabled,
  borderColor: _borderColor,
  bg: _bg,
  width: _width,
  height: _height,
  ...props
}) => (
  <CheckboxWrapper
    circle={circle}
    disabled={disabled}
    borderColor={_borderColor}
    bg={_bg}
    width={_width}
    height={_height}
  >
    <RcCheckbox disabled={disabled} {...props} />
  </CheckboxWrapper>
);

Checkbox.propTypes = {
  circle: PropTypes.bool,
  disabled: PropTypes.bool,
  ...borderColor.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...height.propTypes,
};

Checkbox.defaultProps = {
  circle: false,
  disabled: false,
};

export default Checkbox;
