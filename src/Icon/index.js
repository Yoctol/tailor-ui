import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, color } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';

import * as icons from './icons';

const IconWrapper = styled.img`
  ${ifProp('clickable', 'cursor: pointer')};

  ${space};
  ${color};
`;

IconWrapper.defaultProps = {
  theme,
  width: 24,
  height: 24,
  color: 'bodyFont',
};

const Icon = ({ type, ...otherProps }) => {
  if (typeof type === 'string') {
    if (icons[type]) {
      return <IconWrapper src={icons[type]} {...otherProps} />;
    }

    return console.error('Build-in icon does not exists!');
  }

  const IconWithComponent = IconWrapper.withComponent(type);
  return <IconWithComponent {...otherProps} />;
};

Icon.propTypes = {
  type: PropTypes.oneOf(PropTypes.string, PropTypes.element).isRequired,
};

export default Icon;
