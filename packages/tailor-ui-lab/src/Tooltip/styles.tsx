import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

export type StyledTooltipProps = SpaceProps;

export const StyledTooltip: any = styled.div<StyledTooltipProps>`
  border-radius: ${p => p.theme.radii.lg};
  opacity: 0.9;
  background-color: ${p => p.theme.colors.primaryDark2};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${p => p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;

  ${space};
`;

StyledTooltip.defaultProps = {
  p: 2,
};
