import React from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import styled from 'styled-components';
import { themeGet, width, height } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';

const CheckboxWrapper = styled.span`
  .rc-checkbox {
    position: relative;
    display: inline-block;
    outline: none;
    line-height: 1;
  }

  .rc-checkbox-inner {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    border: 1px solid
      ${ifProp(
        'disabled',
        themeGet('colors.gray.8'),
        themeGet('colors.primary')
      )};
    border-radius: 3px;
    background-color: #fff;

    ${width};
    ${height};
  }

  .rc-checkbox-inner::after {
    position: absolute;
    top: ${props => (props.height - 11) / 2}px;
    left: ${props => (props.height - 7) / 2}px;
    display: table;
    width: 5px;
    height: 8px;
    border-top: 0;
    border-left: 0;
    border-radius: ${themeGet('radii.1')};
    transform: rotate(45deg);
    content: ' ';
  }

  .rc-checkbox-input {
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: ${ifProp('disabled', 'default', 'pointer')};

    ${width};
    ${height};

    opacity: 0;
  }

  .rc-checkbox-checked .rc-checkbox-inner {
    background-color: ${themeGet('colors.primary')};
    border-color: ${themeGet('colors.primary')};
  }

  .rc-checkbox-checked .rc-checkbox-inner::after {
    position: absolute;
    top: ${props => (props.height - 11) / 2}px;
    left: ${props => (props.height - 7) / 2}px;
    display: table;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg);
    content: ' ';
  }

  .rc-checkbox-disabled .rc-checkbox-inner::after {
    border-color: #f3f3f3;
  }

  .rc-checkbox-disabled.rc-checkbox-checked .rc-checkbox-inner::after {
    border-color: #ccc;
  }

  .rc-checkbox-disabled .rc-checkbox-inner {
    background-color: #f3f3f3;
    border-color: #d9d9d9;
  }
`;

CheckboxWrapper.propTypes = {
  ...width.propTypes,
  ...height.propTypes,
};

CheckboxWrapper.defaultProps = {
  theme,
};

const Checkbox = ({ disabled, width: _width, height: _height, ...props }) => (
  <CheckboxWrapper disabled={disabled} width={_width} height={_height}>
    <RcCheckbox disabled={disabled} {...props} />
  </CheckboxWrapper>
);

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
};

Checkbox.defaultProps = {
  disabled: false,
  height: 19,
  width: 19,
};

export default Checkbox;
