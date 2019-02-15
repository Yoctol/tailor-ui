import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
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

import tag from '../utils/CleanTag';

import CardBlock from './CardBlock';
import CardImage, { StyledImage } from './CardImage';

export type CardProps = SpaceProps &
  HeightProps &
  WidthProps &
  ColorProps &
  BorderColorProps &
  BorderRadiusProps & {
    clickable?: boolean;
    hoverable?: boolean;
    onClick?: (event: MouseEvent) => void;
  };

const CardWrapper = styled(tag.div)<CardProps>`
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

  ${StyledImage /* sc-selector */}:first-child {
    border-top-left-radius: calc(${p => p.theme.radii.lg} - 1px);
    border-top-right-radius: calc(${p => p.theme.radii.lg} - 1px);
  }

  ${StyledImage /* sc-selector */}:last-child {
    border-bottom-right-radius: calc(${p => p.theme.radii.lg} - 1px);
    border-bottom-left-radius: calc(${p => p.theme.radii.lg} - 1px);
  }

  ${space};
  ${height};
  ${width};
  ${color};
  ${borderColor};
  ${borderRadius}; /* stylelint-disable-line order/properties-order */
`;

const Card: FunctionComponent<CardProps> & {
  Block: typeof CardBlock;
  Image: typeof CardImage;
} = props => <CardWrapper clickable={!!props.onClick} {...props} />;

Card.Block = CardBlock;
Card.Image = CardImage;

Card.defaultProps = {
  bg: 'light',
  borderRadius: 'lg',
  borderColor: 'gray300',
};

export default Card;
