import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  borderColor,
  borderRadius,
  color,
  height,
  space,
  themeGet,
  width,
  SpaceProps,
  HeightProps,
  WidthProps,
  ColorProps,
  BorderColorProps,
  BorderRadiusProps,
} from 'styled-system';

import CardImage from './CardImage';
import CardBlock from './CardBlock';

export type CardProps = SpaceProps &
  HeightProps &
  WidthProps &
  ColorProps &
  BorderColorProps &
  BorderRadiusProps & {
    clickable: boolean;
    hoverable: boolean;
  };

const CardWrapper = styled<CardProps, 'div'>('div')`
  display: flex;
  flex-direction: column;
  border: ${themeGet('borders.base')};
  border-color: ${themeGet('colors.gray.8')};

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `};

  ${({ hoverable }) =>
    hoverable &&
    css`
      box-shadow: ${p => p.theme.shadows[0]};
      &:hover {
        box-shadow: ${p => p.theme.shadows[1]};
      }
    `};

  ${space};
  ${height};
  ${width};
  ${color};
  ${borderColor};
  ${borderRadius};
`;

CardWrapper.defaultProps = {
  bg: 'light',
  borderRadius: 'lg',
  borderColor: 'gray.8',
};

class Card extends PureComponent<{
  clickable: boolean;
  hoverable: boolean;
}> {
  static Block = CardBlock;
  static Image = CardImage;

  render() {
    return <CardWrapper {...this.props} />;
  }
}

export default Card;
