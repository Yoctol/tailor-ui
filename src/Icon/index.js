import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';
import { space, style } from 'styled-system';

import controlTransition from '../utils/transition';

import * as icons from './icons';

const fill = style({
  prop: 'fill',
  cssProperty: 'fill',
  key: 'colors',
});

const size = css`
  width: ${prop('size')}px;
  height: ${prop('size')}px;
`;

export const IconWrapper = styled.i`
  display: inline-block;
  line-height: 1.5;
  cursor: ${prop('cursor')};

  svg {
    vertical-align: middle;

    ${controlTransition()};
    ${fill};
    ${size};
  }

  ${space};
`;

IconWrapper.propTypes = {
  cursor: PropTypes.string.isRequired,
  ...size.propTypes,
  ...space.propTypes,
};

IconWrapper.defaultProps = {
  size: 24,
  fill: 'gray.2',
};

const Icon = ({ type, ...otherProps }) => {
  let IconComponent = type;

  if (typeof type === 'string') {
    const BuiltInIcon = icons[type];

    if (!BuiltInIcon) {
      throw new Error('Built-in icon does not exists!');
    }

    IconComponent = BuiltInIcon;
  }

  return (
    <IconWrapper {...otherProps}>
      <IconComponent />
    </IconWrapper>
  );
};

Icon.propTypes = {
  /**
   * Set the cursor of Icon
   */
  cursor: PropTypes.string,
  /**
   * Type of icon. Can be a react-icon or built-in icon string
   */
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

Icon.defaultProps = {
  cursor: 'default',
};

export default Icon;
