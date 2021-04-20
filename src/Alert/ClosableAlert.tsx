import React, { FC, useEffect, useState } from 'react';
import { animated, config, to, useSpring } from '@react-spring/web';

import { useMeasure } from '../hooks';

import BaseAlert, { BaseAlertProps } from './BaseAlert';

export interface AlertProps extends BaseAlertProps {
  onClosed?: () => void;
}

const ClosableAlert: FC<AlertProps> = ({ onClosed, ...props }) => {
  const [bind, { height: boundHeight }] = useMeasure();
  const [visible, setVisible] = useState(true);
  const [closeDone, setCloseDone] = useState(false);
  const { x, height } = useSpring({
    x: visible ? 1 : 0,
    height: visible ? boundHeight : 0,
    onRest: {
      x: (restX) => {
        if (restX.value === 0) {
          setCloseDone(true);
        }
      },
    },
    config: {
      ...config.default,
      precision: 0.1,
    },
  });

  useEffect(() => {
    if (onClosed && closeDone) {
      onClosed();
    }
  }, [closeDone, onClosed]);

  if (closeDone) {
    return null;
  }

  return (
    <animated.div
      style={{
        transform: to(x, (_x) => `scaleY(${_x})`),
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
