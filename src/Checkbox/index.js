import React from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import styled from 'styled-components';
import { themeGet, width, height } from 'styled-system';
import { ifProp } from 'styled-tools';
import 'rc-checkbox/assets/index.css';

import theme from '../theme';

const CheckboxWrapper = styled.span`
  span.rc-checkbox {
    line-height: 0;
  }

  input.rc-checkbox-input {
    cursor: ${ifProp('disabled', 'auto')};

    ${width};
    ${height};
  }

  span.rc-checkbox-inner {
    border: ${themeGet('borders.default')} ${themeGet('colors.gray.4')};
    border-radius: ${themeGet('radii.1')};
    border-color: ${ifProp(
      'disabled',
      themeGet('colors.gray.8'),
      themeGet('colors.gray.4')
    )};

    &::after {
      top: ${props => (props.height - 11) / 2}px;
      left: ${props => (props.height - 7) / 2}px;
    }

    ${width};
    ${height};
  }

  .rc-checkbox-checked .rc-checkbox-inner {
    background-color: ${themeGet('colors.gray.4')};
    border-color: ${themeGet('colors.gray.4')};
  }

  .rc-checkbox:hover .rc-checkbox-inner,
  .rc-checkbox-input:focus + .rc-checkbox-inner {
    border-color: ${ifProp(
      'disabled',
      themeGet('colors.gray.8'),
      themeGet('colors.gray.4')
    )};
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
