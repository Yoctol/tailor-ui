import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { config, useTransition } from 'react-spring';

import Portal from '../Portal';
import { Position, Positions } from '../constants';

import PositionerWrapper from './PositionerWrapper';
import getPosition from './getPosition';

type RenderPropsChildren = ({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) => ReactNode;

type RenderPropsPositioner = ({
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
}) => {
  const targetRefFromSelf = useRef<HTMLElement>(null);
  const positionerRefFromSelf = useRef<HTMLElement>(null);
  const laf = useRef<number>();
  const entered = useRef<boolean>(false);
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

  const update = (prevHeight = 0, prevWidth = 0) => {
    if (!visible || !targetRef.current || !positionerRef.current) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();

    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;

    let height: number;
    let width: number;

    if (entered.current) {
      const positionerRect = positionerRef.current.getBoundingClientRect();

      height = Math.round(positionerRect.height);
      width = Math.round(positionerRect.width);
    } else {
      height = Math.max(positionerRef.current.offsetHeight, prevHeight);
      width = Math.max(positionerRef.current.offsetWidth, prevWidth);
    }

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
  };

  useEffect(() => {
    laf.current = requestAnimationFrame(() => {
      update();
    });
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
    } as any,
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    } as any,
    leave: {
      opacity: 0,
      transform: 'scale(1)',
    } as any,
    onRest: (item: boolean, currentState: 'leave' | 'update') => {
      if (item && currentState === 'update') {
        entered.current = item;
      }
      if (item && currentState === 'leave') {
        entered.current = false;
        setState({
          top: null,
          left: null,
          transformOrigin: null,
        });
      }
    },
    config: config.stiff,
  });

  return (
    <>
      {children instanceof Function ? children({ ref: targetRef }) : children}
      <Portal>
        {transitions.map(({ key, item, props }) => {
          if (!item) {
            return null;
          }

          return (
            <PositionerWrapper key={key} left={state.left} top={state.top}>
              {positioner({
                ref: positionerRef,
                style: {
                  ...props,
                  transformOrigin: state.transformOrigin || undefined,
                },
              })}
            </PositionerWrapper>
          );
        })}
      </Portal>
    </>
  );
};

export default Positioner;
