import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTransition } from 'react-spring';

import Portal from '../Portal';
import Stack from '../Stack';
import { Position, Positions, StackingOrder } from '../constants';

import PositionerWrapper from './PositionerWrapper';
import getPosition from './getPosition';

type RenderPropsChildren = ({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) => ReactNode;

export type RenderPropsPositioner = ({
  ref,
  style,
}: {
  ref: RefObject<HTMLElement>;
  style: CSSProperties;
}) => ReactNode;

interface PositionerProps {
  visible?: boolean;
  position?: Positions;
  targetRef?: RefObject<HTMLElement>;
  positionerRef?: RefObject<HTMLElement>;
  targetOffset?: number;
  bodyOffset?: number;
  positioner: RenderPropsPositioner;
  children: ReactNode | RenderPropsChildren;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
}

const Positioner: FunctionComponent<PositionerProps> = ({
  visible,
  targetRef: targetRefFromProps,
  positionerRef: positionerRefFromProps,
  position = Position.TOP_RIGHT,
  targetOffset = 6,
  bodyOffset = 6,
  children,
  positioner,
  onOpenComplete,
  onCloseComplete,
}) => {
  const targetRefFromSelf = useRef<HTMLElement>(null);
  const positionerRefFromSelf = useRef<HTMLElement>(null);
  const laf = useRef<number>();
  const entered = useRef<boolean>(false);
  const prevDimensions = useRef({ height: 0, width: 0 });
  const [state, setState] = useState<{
    top: number | null;
    left: number | null;
    transformOrigin: string | null;
  }>({
    top: null,
    left: null,
    transformOrigin: null,
  });

  const targetRef = targetRefFromProps || targetRefFromSelf;
  const positionerRef = positionerRefFromProps || positionerRefFromSelf;

  useEffect(
    () => () => {
      if (laf.current) {
        cancelAnimationFrame(laf.current);
      }
    },
    []
  );

  const update = () => {
    if (!visible || !targetRef.current || !positionerRef.current) {
      return;
    }

    let height: number;
    let width: number;

    if (entered.current) {
      const positionerRect = positionerRef.current.getBoundingClientRect();

      height = Math.round(positionerRect.height);
      width = Math.round(positionerRect.width);
    } else {
      const { height: prevHeight, width: prevWidth } = prevDimensions.current;

      height = Math.max(positionerRef.current.offsetHeight, prevHeight);
      width = Math.max(positionerRef.current.offsetWidth, prevWidth);
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;

    const { rect, transformOrigin } = getPosition({
      position,
      targetRect,
      targetOffset,
      dimensions: {
        height,
        width,
      },
      viewport: {
        width: viewportWidth,
        height: viewportHeight,
      },
      viewportOffset: bodyOffset,
    });

    setState({
      left: rect.left,
      top: rect.top,
      transformOrigin,
    });

    prevDimensions.current = {
      height,
      width,
    };
  };

  useEffect(() => {
    if (![state.top, state.left, state.transformOrigin].includes(null)) {
      laf.current = requestAnimationFrame(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (visible) {
      update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const transitions = useTransition(visible, null, {
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
      pointerEvents: 'none',
    },
    onDestroyed: isDestroyed => {
      if (isDestroyed) {
        entered.current = false;
        prevDimensions.current = { height: 0, width: 0 };

        setState({
          top: null,
          left: null,
          transformOrigin: null,
        });

        if (!visible && onCloseComplete) {
          onCloseComplete();
        }
      } else {
        entered.current = true;

        if (visible && onOpenComplete) {
          onOpenComplete();
        }
      }
    },
    config: {
      tension: 320,
      friction: 24,
    },
  });

  return (
    <Stack defaultOrder={StackingOrder.POSITIONER}>
      {stackingOrder => (
        <>
          {children instanceof Function
            ? children({ ref: targetRef })
            : children}

          {transitions.map(({ key, item, props }) => {
            if (!item) {
              return null;
            }

            return (
              <Portal key={key} zIndex={stackingOrder}>
                <PositionerWrapper
                  left={state.left}
                  top={state.top}
                  transformOrigin={state.transformOrigin}
                  style={props}
                  positioner={positioner}
                  positionerRef={positionerRef}
                />
              </Portal>
            );
          })}
        </>
      )}
    </Stack>
  );
};

export default Positioner;
