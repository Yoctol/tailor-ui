import styled from 'styled-components';
import * as system from 'styled-system';

export type BoxProps = system.GridAreaProps &
  system.PositionProps &
  system.SpaceProps &
  system.BackgroundProps &
  system.TypographyProps &
  system.ColorProps &
  system.BorderProps &
  system.ShadowProps &
  system.LayoutProps &
  system.FlexboxProps;

export const box = system.compose(
  system.gridArea,
  system.position,
  system.space,
  system.background,
  system.typography,
  system.color,
  system.border,
  system.shadow,
  system.layout,
  system.flexbox
);

const Box = styled('div')<BoxProps>(
  {
    boxSizing: 'border-box',
  },
  box
);

export { Box };
