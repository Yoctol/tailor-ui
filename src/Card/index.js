import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  themeGet,
  color,
  space,
  height,
  width,
  borderRadius,
  fontSize,
} from 'styled-system';

import _Button from '../Button';

const Block = styled.div`
  position: relative;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};

  &:last-child {
    border-bottom: 0;
  }

  ${space};
  ${height};
  ${fontSize};
`;

Block.propTypes = {
  ...space.propTypes,
  ...height.propTypes,
};

Block.defaultProps = {
  p: 4,
  fontSize: 'default',
};

const Button = styled(_Button).attrs({ light: true })`
  border: 0;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
  border-radius: 0;

  &:last-child {
    border-bottom: 0;
  }

  &:focus {
    z-index: 1;
    border: 0;
    border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};

    &:last-child {
      border-bottom: 0;
    }
  }
`;

Button.displayName = 'Card.Button';

const Image = styled.div`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

Image.propTypes = {
  ...space.propTypes,
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: ${themeGet('borders.default')} ${themeGet('colors.border')};

  ${space};
  ${height};
  ${width};
  ${color};
  ${borderRadius};

  ${Button}:first-child {
    border-top-left-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
    border-top-right-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
  }

  ${Button}:last-child {
    border-bottom-right-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
    border-bottom-left-radius: ${props =>
      themeGet(`radii.${props.borderRadius}`, 'radii.1')(props)};
  }
`;

const Card = ({ children, ...otherProps }) => (
  <CardWrapper {...otherProps}>
    {Children.map(
      children,
      child =>
        child.props.children &&
        child.props.children.type &&
        child.props.children.type.displayName &&
        ['Input', 'Button'].includes(child.props.children.type.displayName)
          ? cloneElement(child, { p: 1 })
          : cloneElement(child)
    )}
  </CardWrapper>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  ...space.propTypes,
  ...height.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...borderRadius.propTypes,
};

/* eslint-disable react/default-props-match-prop-types */
Card.defaultProps = {
  bg: 'bgLight',
  borderRadius: 1,
};
/* eslint-enable react/default-props-match-prop-types */

Card.Block = Block;
Card.Button = Button;
Card.Image = Image;

export default Card;
