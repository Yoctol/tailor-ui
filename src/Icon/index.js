import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { style, space } from 'styled-system';
import { prop } from 'styled-tools';

import * as icons from './icons';

const fill = style({
  prop: 'fill',
  cssProperty: 'fill',
  key: 'colors',
});

const size = css`
  width: ${prop('size')}px;
  height: ${prop('size')}px;

  svg {
    width: ${prop('size')}px;
    height: ${prop('size')}px;
  }
`;

const IconWrapper = styled.i`
  display: inline-block;
  cursor: ${prop('cursor')};

  svg {
    vertical-align: middle;

    ${fill};
  }

  ${size};
  ${space};
`;

IconWrapper.propTypes = {
  cursor: PropTypes.string.isRequired,
  ...size.propTypes,
  ...space.propTypes,
};

IconWrapper.defaultProps = {
  size: 24,
  fill: 'bodyFont',
};

const Icon = ({ type, ...otherProps }) => {
  let IconComponent = type;

  if (typeof type === 'string') {
    const BuiltInIcon = icons[type];
    if (BuiltInIcon) {
      IconComponent = BuiltInIcon;
    } else {
      return console.error('Built-in icon does not exists!');
    }
  }

  return (
    <IconWrapper {...otherProps} className="icon">
      <IconComponent />
    </IconWrapper>
  );
};

Icon.propTypes = {
  cursor: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

Icon.defaultProps = {
  cursor: 'default',
};

export default Icon;
