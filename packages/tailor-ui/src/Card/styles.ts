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
import { HTMLAttributes } from 'react';

export const StyledImage = styled.div<SpaceProps>`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

export const StyledBlock = styled.div<SpaceProps & HeightProps>`
  position: relative;
  border-bottom: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.gray300};
  font-size: ${p => p.theme.fontSizes.base};

  &:last-child {
    border-bottom: 0;
  }

  ${space};
  ${height};
`;

StyledBlock.defaultProps = {
  p: 3,
};

export type CardProps = HTMLAttributes<HTMLDivElement> &
  SpaceProps &
  HeightProps &
  WidthProps &
  ColorProps &
  BorderColorProps &
  BorderRadiusProps & {
    clickable?: boolean;
    hoverable?: boolean;
  };

export const CardWrapper = styled.div<CardProps>`
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
