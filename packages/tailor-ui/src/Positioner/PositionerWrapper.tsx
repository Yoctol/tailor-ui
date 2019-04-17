import React, { FunctionComponent, RefObject, memo } from 'react';

import { RenderPropsPositioner } from './Positioner';

interface PositionWrapperProps {
  left: number | null;
  top: number | null;
  transformOrigin: string | null;
  style: any;
  positioner: RenderPropsPositioner;
  positionerRef: RefObject<HTMLElement>;
}

const areEqual = (
  prevProps: PositionWrapperProps,
  nextProps: PositionWrapperProps
) =>
  prevProps.top === nextProps.top &&
  prevProps.left === nextProps.left &&
  prevProps.transformOrigin === nextProps.transformOrigin &&
  prevProps.positioner === nextProps.positioner &&
  prevProps.positionerRef === nextProps.positionerRef;

const PositionWrapper: FunctionComponent<PositionWrapperProps> = memo(
  ({ left, top, transformOrigin, style, positioner, positionerRef }) => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        willChange: 'transform',
        transform: `translate3d(${left}px, ${top}px, 0px)`,
      }}
    >
      {positioner({
        ref: positionerRef,
        style: {
          ...style,
          transformOrigin: transformOrigin || undefined,
        },
      })}
    </div>
  ),
  areEqual
);

export default PositionWrapper;
