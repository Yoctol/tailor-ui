import styled from 'styled-components';
import * as system from 'styled-system';

const overflowX = system.style({
  prop: 'overflowX',
  cssProperty: 'overflow-x',
});

const overflowY = system.style({
  prop: 'overflowY',
  cssProperty: 'overflow-y',
});

export type BoxProps = system.PositionProps &
  system.TopProps &
  system.RightProps &
  system.BottomProps &
  system.LeftProps &
  system.OverflowProps &
  system.ZIndexProps &
  system.DisplayProps &
  system.SpaceProps &
  system.LineHeightProps &
  system.BackgroundProps &
  system.FontSizeProps &
  system.TextAlignProps &
  system.ColorProps &
  system.BordersProps &
  system.BorderColorProps &
  system.BorderRadiusProps &
  system.WidthProps &
  system.MinWidthProps &
  system.MaxWidthProps &
  system.HeightProps &
  system.MinHeightProps &
  system.MaxHeightProps &
  system.FlexProps &
  system.OrderProps &
  system.AlignSelfProps & {
    overflowX?: string;
    overflowY?: string;
  };

export const box = system.compose(
  system.position,
  system.top,
  system.right,
  system.bottom,
  system.left,
  system.overflow,
  overflowX as any,
  overflowY as any,

  system.zIndex,
  system.display,
  system.space,
  system.lineHeight,
  system.background,
  system.fontSize,
  system.textAlign,
  system.color,

  system.borders,
  system.borderColor,
  system.borderRadius,

  system.width,
  system.minWidth,
  system.maxWidth,

  system.height,
  system.minHeight,
  system.maxHeight,

  system.flex,
  system.order,
  system.alignSelf
);

const Box = styled('div')<BoxProps>(
  {
    boxSizing: 'border-box',
  },
  box
);

export { Box };
