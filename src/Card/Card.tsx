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
  border: ${p => p.theme.borders.base};

  ${p => p.theme.transition};

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `};

  ${({ hoverable }) =>
    hoverable &&
    css`
      box-shadow: ${p => p.theme.shadows.base};
      &:hover {
        box-shadow: ${p => p.theme.shadows.lg};
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
    borderColor: 'gray300',
  };

  render() {
    return <CardWrapper {...this.props} />;
  }
}

export default Card;
