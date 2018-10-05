import React, { SFC } from 'react';
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
import { Transition, animated, config } from 'react-spring';

import styled, { css } from 'utils/styled-components';

export type Placement = 'top' | 'bottom' | 'right' | 'left';

const TooltipToggle = styled.div`
  position: absolute;
  z-index: 99;

  ${({ placement }: { placement: Placement }) =>
    ({
      top: css`
        bottom: 100%;
        left: 50%;
        margin-bottom: 10px;
      `,
      bottom: css`
        top: 100%;
        left: 50%;
        margin-top: 10px;
      `,
      right: css`
        top: 50%;
        left: 100%;
        margin-left: 10px;
      `,
      left: css`
        top: 50%;
        right: 100%;
        margin-right: 10px;
      `,
    }[placement])};
`;

const AnimatedTooltipToggle = animated(TooltipToggle);

export type TooltipContentProps = SpaceProps &
  MinWidthProps &
  ColorProps &
  BorderRadiusProps &
  TextAlignProps & {
    light: boolean;
  };

export const TooltipContent = styled<TooltipContentProps, 'div'>('div')`
  border: ${p => p.theme.borders.base};
  border-color: ${({ light, theme: { colors } }) =>
    light ? colors.gray400 : colors.primaryDark};
  background-color: ${({ light, theme: { colors } }) =>
    light ? colors.gray100 : colors.primaryDark};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${({ light, theme: { colors } }) =>
    light ? colors.gray700 : colors.light};

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

export const Arrow = styled<IArrowProps, 'div'>('div')`
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
      top: css`
        left: 50%;
        margin-left: -4px;
      `,
      bottom: css`
        top: -5px;
        left: 50%;
        margin-left: -3px;
        transform: rotate(180deg);
      `,
      right: css`
        top: 50%;
        left: -7px;
        margin-top: -1px;
        transform: rotate(90deg);
      `,
      left: css`
        top: 50%;
        right: -7px;
        margin-top: -1px;
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

export interface ITooltipWrapperProps {
  display?: string;
}

export const TooltipWrapper = styled<ITooltipWrapperProps, 'div'>('div')`
  display: ${p => p.display || 'inline-block'};
  position: relative;
`;

const getTransformOrigin = (placement: Placement) =>
  ({
    top: '0 bottom',
    bottom: '0 top',
    left: 'right 0',
    right: 'left 0',
  }[placement]);

const getTrsnformTranslateAxis = (placement: Placement) =>
  ({
    top: 'X',
    bottom: 'X',
    left: 'Y',
    right: 'Y',
  }[placement]);

export interface IBaseTooltipProps {
  visible: boolean;
  overlay: React.ReactNode;
  placement?: Placement;
}

const BaseTooltip: SFC<IBaseTooltipProps> = ({
  visible,
  placement = 'bottom',
  overlay,
}) => (
  <Transition
    native
    keys={visible ? 'on' : 'off'}
    from={{ time: 0 }}
    enter={{ time: 1 }}
    leave={{ time: 0 }}
    config={config.gentle}
  >
    {visible &&
      (({ time }) => {
        const transformOrigin = getTransformOrigin(placement);
        const translateAxis = getTrsnformTranslateAxis(placement);
        return (
          <AnimatedTooltipToggle
            placement={placement}
            style={{
              opacity: time,
              transformOrigin,
              transform: time.interpolate(
                (t: number) => `scale(${t}) translate${translateAxis}(-50%)`
              ),
            }}
          >
            {overlay}
          </AnimatedTooltipToggle>
        );
      })}
  </Transition>
);

export default BaseTooltip;
