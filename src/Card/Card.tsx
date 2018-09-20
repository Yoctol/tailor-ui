import React, { PureComponent } from 'react';
import {
  BorderColorProps,
  BorderRadiusProps,
  ColorProps,
  HeightProps,
  SpaceProps,
  WidthProps,
  borderColor,
  borderRadius,
  color,
  height,
  space,
  themeGet,
  width,
} from 'styled-system';

import styled, { css } from 'utils/styled-components';

import CardBlock from './CardBlock';
import CardImage from './CardImage';

export type CardProps = SpaceProps &
  HeightProps &
  WidthProps &
  ColorProps &
  BorderColorProps &
  BorderRadiusProps & {
    clickable?: boolean;
    hoverable?: boolean;
  };

const CardWrapper = styled<CardProps, any>('div')`
  display: flex;
  flex-direction: column;
  border: ${themeGet('borders.base')};
  border-color: ${themeGet('colors.gray.8')};

  ${p => p.theme.transition};

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

class Card extends PureComponent<CardProps> {
  static Block = CardBlock;

  static Image = CardImage;

  static defaultProps = {
    bg: 'light',
    borderRadius: 'lg',
    borderColor: 'gray.8',
  };

  render() {
    return <CardWrapper {...this.props} />;
  }
}

export default Card;
