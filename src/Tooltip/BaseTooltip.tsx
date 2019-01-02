import {
  BorderRadiusProps,
  ColorProps,
  MinWidthProps,
  SpaceProps,
  TextAlignProps,
  borderRadius,
  color,
  minWidth,
  space,
  textAlign,
} from 'styled-system';
import { animated } from 'react-spring';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';

export type Placement = 'top' | 'bottom' | 'right' | 'left';

export type TooltipContentProps = SpaceProps &
  MinWidthProps &
  ColorProps &
  BorderRadiusProps &
  TextAlignProps & {
    light: boolean;
  };

export const TooltipContent = styled<TooltipContentProps, 'div'>(tag.div)`
  border: ${p => p.theme.borders.base};
  border-color: ${({ light, theme: { colors } }) =>
    light ? colors.gray400 : colors.primaryDark};
  background-color: ${({ light, theme: { colors } }) =>
    light ? colors.gray100 : colors.primaryDark};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${({ light, theme: { colors } }) =>
    light ? colors.gray700 : colors.light};
  font-size: ${p => p.theme.fontSizes.sm};

  ${({ light }) =>
    !light &&
    css`
      opacity: 0.8;
    `};

  ${space};
  ${minWidth};
  ${color};
  ${borderRadius};
  ${textAlign};
`;

TooltipContent.defaultProps = {
  minWidth: 120,
  p: 1,
  textAlign: 'center',
  borderRadius: 'base',
};

export interface IArrowProps {
  light: boolean;
  placement: Placement;
}

export const Arrow = styled<IArrowProps, 'div'>(tag.div)`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 5px solid
    ${({ light, theme: { colors } }) =>
      light ? colors.gray400 : colors.primaryDark};
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;

  ${({ light }) =>
    !light &&
    css`
      opacity: 0.8;
    `};

  ${({ placement }) =>
    ({
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
    }[placement])};

  ${({ light }) =>
    light &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: -7px;
        left: -6px;
        border-top: 6px solid ${p => p.theme.colors.gray100};
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
      }
    `};
`;

const TooltipToggle = styled<any, 'div'>(tag.div)`
  position: absolute;
  z-index: 99;
`;

export default animated(TooltipToggle);
