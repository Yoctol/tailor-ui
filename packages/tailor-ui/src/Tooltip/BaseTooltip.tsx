import styled, { css } from 'styled-components';
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

import tag from '../utils/CleanTag';
import { Placement } from '../Trigger/type';

export type TooltipContentProps = SpaceProps &
  ColorProps &
  BorderRadiusProps &
  TextAlignProps & {
    light: boolean;
  };

export const TooltipContent = styled(tag.div)<TooltipContentProps>`
  border: ${p => p.theme.borders.base};
  border-color: ${({ light, theme: { colors } }) =>
    light ? colors.gray400 : colors.primaryDark2};
  background-color: ${({ light, theme: { colors } }) =>
    light ? colors.gray100 : colors.primaryDark2};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${({ light, theme: { colors } }) =>
    light ? colors.gray700 : colors.light};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;

  ${({ light }) =>
    !light &&
    css`
      opacity: 0.8;
    `};

  ${space};
  ${color};
  ${borderRadius};
  ${textAlign};
`;

TooltipContent.defaultProps = {
  py: 1,
  px: 2,
  textAlign: 'center',
  borderRadius: 'base',
};

export interface ArrowProps {
  light: boolean;
  placement: Placement;
}

const arrowPlacementStyles = {
  topLeft: css`
    left: 25%;
    margin-left: -4px;
  `,
  top: css`
    left: 50%;
    margin-left: -4px;
  `,
  topRight: css`
    left: 75%;
    margin-left: -4px;
  `,
  bottomLeft: css`
    top: -5px;
    left: 25%;
    margin-left: -3px;
    transform: rotate(180deg);
  `,
  bottom: css`
    top: -5px;
    left: 50%;
    margin-left: -3px;
    transform: rotate(180deg);
  `,
  bottomRight: css`
    top: -5px;
    left: 75%;
    margin-left: -3px;
    transform: rotate(180deg);
  `,
  rightTop: css`
    top: 30%;
    left: -7px;
    margin-top: -2px;
    transform: rotate(90deg);
  `,
  right: css`
    top: 50%;
    left: -7px;
    margin-top: -2px;
    transform: rotate(90deg);
  `,
  rightBottom: css`
    top: 70%;
    left: -7px;
    margin-top: -2px;
    transform: rotate(90deg);
  `,
  leftTop: css`
    top: 30%;
    right: -7px;
    margin-top: -2px;
    transform: rotate(-90deg);
  `,
  left: css`
    top: 50%;
    right: -7px;
    margin-top: -2px;
    transform: rotate(-90deg);
  `,
  leftBottom: css`
    top: 70%;
    right: -7px;
    margin-top: -2px;
    transform: rotate(-90deg);
  `,
};

export const Arrow = styled(tag.div)<ArrowProps>`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 5px solid
    ${({ light, theme: { colors } }) =>
      light ? colors.gray400 : colors.primaryDark2};
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;

  ${({ light }) =>
    !light &&
    css`
      opacity: 0.8;
    `};

  ${({ placement }: ArrowProps) => arrowPlacementStyles[placement] || ''};

  ${({ light, theme }) =>
    light &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: -7px;
        left: -6px;
        border-top: 6px solid ${theme.colors.gray100};
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
      }
    `};
`;
