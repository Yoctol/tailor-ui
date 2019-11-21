import styled from 'styled-components';
import {
  MinHeightProps,
  MinWidthProps,
  SpaceProps,
  minHeight,
  minWidth,
  space,
} from 'styled-system';

export type StyledPopoverProps = SpaceProps & MinWidthProps & MinHeightProps;

export const StyledPopover = styled.div<StyledPopoverProps>`
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[3]};
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.lg};
  border-color: ${p => p.theme.colors.gray300};
  background-color: ${p => p.theme.colors.light};
  box-shadow: ${p => p.theme.shadows.base};
  color: ${p => p.theme.colors.gray700};
  font-size: ${p => p.theme.fontSizes.sm};
  text-align: left;
  white-space: nowrap;

  ${space}
  ${minWidth}
  ${minHeight}
`;

export const PopoverHeader = styled.div`
  margin-bottom: ${p => p.theme.space[2]};
`;
