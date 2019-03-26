import styled from 'styled-components';
import {
  BorderRadiusProps,
  ColorProps,
  SpaceProps,
  TextAlignProps,
  borderRadius,
  color,
  space,
  textAlign,
} from 'styled-system';

export type StyledTooltipProps = SpaceProps &
  ColorProps &
  BorderRadiusProps &
  TextAlignProps;

export const StyledTooltip = styled.div<StyledTooltipProps>`
  border: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.primaryDark2};
  opacity: 0.9;
  background-color: ${p => p.theme.colors.primaryDark2};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${p => p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;

  ${space};
  ${color};
  ${borderRadius};
  ${textAlign};
`;

StyledTooltip.defaultProps = {
  py: 1,
  px: 2,
  textAlign: 'center',
  borderRadius: 'base',
};
