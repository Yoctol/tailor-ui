import React, { CSSProperties, FC, RefObject, memo } from 'react';
import styled from 'styled-components';

import { RenderPropsPositioner } from './Positioner';

interface PositionWrapperProps {
  left: number | null;
  top: number | null;
  transformOrigin: string | null;
  style: CSSProperties;
  positioner: RenderPropsPositioner;
  positionerRef: RefObject<HTMLElement>;
}

const StyledPositionerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
`;

const areEqual = (
  prevProps: PositionWrapperProps,
  nextProps: PositionWrapperProps
) =>
  prevProps.top === nextProps.top &&
  prevProps.left === nextProps.left &&
  prevProps.transformOrigin === nextProps.transformOrigin &&
  prevProps.positioner === nextProps.positioner &&
  prevProps.positionerRef === nextProps.positionerRef;

const PositionWrapper: FC<PositionWrapperProps> = memo(
  function PositionWrapper({
    left,
    top,
    transformOrigin,
    style,
    positioner,
    positionerRef,
  }) {
    const transform = `translate3d(${left}px, ${top}px, 0px)`;

    return (
      <StyledPositionerWrapper style={{ transform }}>
        {positioner({
          ref: positionerRef,
          style: {
            ...style,
            transformOrigin: transformOrigin || undefined,
          },
        })}
      </StyledPositionerWrapper>
    );
  },
  areEqual
);

export default PositionWrapper;
