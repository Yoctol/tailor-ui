import React, { SFC, useState } from 'react';
import { Spring, animated, config } from 'react-spring';

import BaseAlert, { IBaseAlertProps } from './BaseAlert';

export interface IAlertProps extends IBaseAlertProps {
  onClosed?: () => void;
}

const ClosableAlert: SFC<IAlertProps> = ({ onClosed, ...props }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Spring
      native
      onRest={({ x }: any) => {
        if (x === 0 && onClosed) {
          onClosed();
        }
      }}
      from={{
        x: 1,
        height: 'auto',
      }}
      to={{
        x: visible ? 1 : 0,
        height: visible ? 'auto' : 0,
      }}
      config={{
        ...config.default,
        precision: 0.1,
      }}
    >
      {({ x, height }: { x: any; height: any }) => (
        <animated.div
          style={{
            transform: x.interpolate((_x: number) => `scaleY(${_x})`),
            opacity: x,
            height,
          }}
        >
          <BaseAlert onClose={() => setVisible(false)} {...props} />
        </animated.div>
      )}
    </Spring>
  );
};
export default ClosableAlert;
