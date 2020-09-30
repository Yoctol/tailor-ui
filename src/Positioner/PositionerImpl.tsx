import React, { CSSProperties, FC, RefObject, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { useRect } from '@reach/rect';

import { Positions } from '../constants';

import getPosition from './getPosition';
import { PositionerRenderer } from './Positioner';

const StyledPositionerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
`;

const targetOffset = 6;
const bodyOffset = 6;

const getPositionerProps = ({
  position,
  positionerRef,
  positionerRect,
  targetRect,
  entered,
  prevDimensions,
}: {
  position: Positions;
  positionerRef: RefObject<HTMLElement>;
  positionerRect: DOMRect | null;
  targetRect: DOMRect;
  entered: boolean;
  prevDimensions: { height: number; width: number };
}) => {
  if (!positionerRect) {
    type hidden = 'hidden';

    return {
      positionerStyle: {
        visibility: 'hidden' as hidden,
      },
    };
  }

  let height: number;
  let width: number;

  if (entered) {
    height = Math.round(positionerRect.height);
    width = Math.round(positionerRect.width);
  } else {
    const { height: prevHeight, width: prevWidth } = prevDimensions;

    height = Math.max(
      (positionerRef.current as HTMLElement).offsetHeight,
      prevHeight
    );
    width = Math.max(
      (positionerRef.current as HTMLElement).offsetWidth,
      prevWidth
    );
  }

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

  return {
    positionerStyle: {
      transform: `translate3d(${rect.left}px, ${rect.top}px, 0px)`,
    },
    transformOrigin,
  };
};

interface PositionerImplProps {
  style: CSSProperties;
  position: Positions;
  positioner: PositionerRenderer;
  positionerRef?: RefObject<HTMLDivElement>;
  targetRef: RefObject<HTMLElement>;
}

const PositionerImpl: FC<PositionerImplProps> = ({
  style,
  position,
  positioner,
  targetRef,
  positionerRef: positionerRefFromProps,
}) => {
  const prevDimensions = useRef({ height: 0, width: 0 });
  const positionerRefFromSelf = useRef<HTMLDivElement>(null);

  const positionerRef = useMemo(
    () => positionerRefFromProps || positionerRefFromSelf,
    [positionerRefFromProps]
  );

  const targetRect = useRect(targetRef);
  const positionerRect = useRect(positionerRef, true, (rect) => {
    prevDimensions.current = {
      height: rect.height,
      width: rect.width,
    };
  });

  if (!targetRect) {
    return null;
  }

  const { positionerStyle, transformOrigin } = getPositionerProps({
    entered: style.opacity === 1,
    position,
    positionerRef,
    positionerRect,
    targetRect,
    prevDimensions: prevDimensions.current,
  });

  return (
    <StyledPositionerWrapper style={positionerStyle}>
      <animated.div
        ref={positionerRef}
        style={{
          ...style,
          transformOrigin,
        }}
      >
        {positioner instanceof Function
          ? positioner({ ref: positionerRef })
          : positioner}
      </animated.div>
    </StyledPositionerWrapper>
  );
};

export default PositionerImpl;
