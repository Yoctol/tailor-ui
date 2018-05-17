import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { style, space } from 'styled-system';
import { ifProp, prop } from 'styled-tools';

import theme from '../theme';

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

  ${ifProp('clickable', 'cursor: pointer')};

  svg {
    ${fill};
    vertical-align: middle;
  }

  ${size};
  ${space};
`;

IconWrapper.defaultProps = {
  theme,
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
    <IconWrapper {...otherProps}>
      <IconComponent />
    </IconWrapper>
  );
};

Icon.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default Icon;
