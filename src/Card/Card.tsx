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
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

import CardBlock from './CardBlock';
import CardImage, { StyledImage } from './CardImage';

export type CardProps = SpaceProps &
  HeightProps &
  WidthProps &
  ColorProps &
  BorderColorProps &
  BorderRadiusProps &
  ICssProps & {
    clickable?: boolean;
    hoverable?: boolean;
    onClick?: (event: MouseEvent) => void;
  };

const CardWrapper = styled<CardProps, any>(tag.div)`
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
  ${styledCss};
`;

class Card extends PureComponent<CardProps> {
  static Block = CardBlock;

  static Image = CardImage;

  static defaultProps = {
    bg: 'light',
    borderRadius: 'lg',
    borderColor: 'gray300',
  };

  handleClick = (event: MouseEvent) => {
    if (this.props.onClick && event.target === event.currentTarget) {
      this.props.onClick(event);
    }
  };

  render() {
    const clickable = !!this.props.onClick;

    return (
      <CardWrapper
        {...this.props}
        clickable={clickable}
        onClick={this.handleClick}
      />
    );
  }
}

export default Card;
