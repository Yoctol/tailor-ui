import React, { FunctionComponent } from 'react';

interface PositionWrapperProps {
  left: number | null;
  top: number | null;
}

const PositionWrapper: FunctionComponent<PositionWrapperProps> = ({
  left,
  top,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      willChange: 'transform',
      transform: `translate3d(${left}px, ${top}px, 0px)`,
    }}
  >
    {children}
  </div>
);

export default PositionWrapper;
