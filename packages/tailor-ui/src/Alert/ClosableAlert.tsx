import React, { FC, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import { useMeasure } from '@tailor-ui/hooks';

import BaseAlert, { BaseAlertProps } from './BaseAlert';

export interface AlertProps extends BaseAlertProps {
  onClosed?: () => void;
}

const ClosableAlert: FC<AlertProps> = ({ onClosed, ...props }) => {
  const [bind, { height: boundHeight }] = useMeasure();
  const [visible, setVisible] = useState(true);
  const { x, height } = useSpring({
    x: visible ? 1 : 0,
    height: visible ? boundHeight : 0,
    onRest: (rest: any) => {
      if (rest.x === 0 && onClosed) {
        onClosed();
      }
    },
    config: {
      ...config.default,
      precision: 0.1,
    },
  });

  return (
    <animated.div
      style={{
        transform: (x as any).interpolate((_x: number) => `scaleY(${_x})`),
        opacity: x,
        height,
      }}
    >
      <div {...bind}>
        <BaseAlert onClose={() => setVisible(false)} {...props} />
      </div>
    </animated.div>
  );
};

export default ClosableAlert;
