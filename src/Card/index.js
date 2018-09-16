import PropTypes from 'prop-types';
import React from 'react';
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

const StyledBlock = styled.div`
  position: relative;
  border-bottom: ${themeGet('borders.base')};
  border-color: ${themeGet('colors.gray.8')};

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
  border: ${themeGet('borders.base')};
  border-color: ${themeGet('colors.gray.8')};

  ${space};
  ${height};
  ${width};
  ${color};
  ${borderRadius};
`;

const Card = ({ children, ...otherProps }) => (
  <CardWrapper {...otherProps}>{children}</CardWrapper>
);

Card.propTypes = {
  /**
   * Should be Card.Block, Card.Image of React.Children
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
  borderRadius: 'lg',
};
/* eslint-enable react/default-props-match-prop-types */

Card.Block = Block;
Card.Image = Image;

export default Card;
