import PropTypes from 'prop-types';
import React, { Children, cloneElement } from 'react';
import styled from 'styled-components';
import {
  borderRadius,
  color,
  fontSize,
  height,
  space,
  themeGet,
  width,
} from 'styled-system';

import _Button from '../Button';

const StyledBlock = styled.div`
  position: relative;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};

  &:last-child {
    border-bottom: 0;
  }

  ${space};
  ${height};
  ${fontSize};
`;

export const Block = props => <StyledBlock {...props} />;

Block.propTypes = {
  /**
   * The padding of block
   */
  p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ...space.propTypes,
  ...height.propTypes,
};

Block.defaultProps = {
  fontSize: 'default', // eslint-disable-line react/default-props-match-prop-types
  p: 4,
};

const Button = styled(_Button).attrs({ light: true })`
  border: 0;
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
  border-radius: 0;

  &:last-child {
    border-bottom: 0;
  }

  &:focus {
    z-index: 1;
    border: 0;
    border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};

    &:last-child {
      border-bottom: 0;
    }
  }
`;

Button.displayName = 'Card.Button';

const StyledImage = styled.div`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

export const Image = props => <StyledImage {...props} />;

Image.propTypes = {
  ...space.propTypes,
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};

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
  /**
   * Should be Card.Block, Card.Image or Card.Button of React.Children
   */
  children: PropTypes.node.isRequired,
  ...space.propTypes,
  ...height.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...borderRadius.propTypes,
};

/* eslint-disable react/default-props-match-prop-types */
Card.defaultProps = {
  bg: 'light',
  borderRadius: 1,
};
/* eslint-enable react/default-props-match-prop-types */

Card.Block = Block;
Card.Button = Button;
Card.Image = Image;

export default Card;
