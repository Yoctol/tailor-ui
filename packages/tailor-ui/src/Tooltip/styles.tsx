import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';
import { rgba } from 'polished';

export type StyledTooltipProps = SpaceProps;

export const StyledTooltip: any = styled.div<StyledTooltipProps>`
  border-radius: ${(p) => p.theme.radii.lg};
  background-color: ${(p) => rgba(p.theme.colors.gray800, 0.9)};
  color: ${(p) => p.theme.colors.light};
  font-size: ${(p) => p.theme.fontSizes.sm};
  white-space: nowrap;

  ${space};
`;

StyledTooltip.defaultProps = {
  p: 2,
};
