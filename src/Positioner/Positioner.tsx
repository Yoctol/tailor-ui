import React, { FC, ReactNode, RefObject, useEffect, useRef } from 'react';
import { useTransition } from '@react-spring/web';

import { Portal } from '../Portal';
import { Position, Positions, StackingOrder } from '../constants';

import PositionerImpl from './PositionerImpl';

type Target =
  | ReactNode
  | FC<{
      ref: RefObject<HTMLElement>;
    }>;

export type PositionerRenderer =
  | ReactNode
  | FC<{
      ref: RefObject<HTMLDivElement>;
    }>;

interface PositionerProps {
  visible?: boolean;
  position?: Positions;
  targetRef?: RefObject<HTMLElement>;
  positionerRef?: RefObject<HTMLDivElement>;
  targetOffset?: number;
  bodyOffset?: number;
  positioner: PositionerRenderer;
  children: Target;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
}

const Positioner: FC<PositionerProps> = ({
  visible,
  targetRef: targetRefFromProps,
  positionerRef,
  position = Position.TOP_RIGHT,
  children,
  positioner,
  onOpenComplete,
  onCloseComplete,
}) => {
  const targetRefFromSelf = useRef<HTMLElement>(null);
  const targetRef = targetRefFromProps || targetRefFromSelf;

  useEffect(() => {
    const originalWarn = console.warn;

    console.warn = (...args: any[]) => {
      if (/You need to place the ref/.test(args[0])) {
        return;
      }
      originalWarn.call(console, ...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  const transition = useTransition(visible, {
    keys: (value) => (value ? 'on' : 'off'),
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(1)',
      pointerEvents: 'none' as const,
    },
    onDestroyed: (isDestroyed) => {
      if (isDestroyed) {
        if (!visible && onCloseComplete) {
          onCloseComplete();
        }
      } else if (visible && onOpenComplete) {
        if (onOpenComplete) {
          onOpenComplete();
        }
      }
    },
    config: {
      mass: 1,
      tension: 500,
      friction: 40,
    },
  });

  return (
    <>
      {children instanceof Function ? children({ ref: targetRef }) : children}

      {transition((style, item) => {
        return (
          item && (
            <Portal defaultOrder={StackingOrder.POSITIONER}>
              <PositionerImpl
                style={style}
                positioner={positioner}
                position={position}
                targetRef={targetRef}
                positionerRef={positionerRef}
              />
            </Portal>
          )
        );
      })}
    </>
  );
};

export { Positioner };
