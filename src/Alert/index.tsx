import React, { PureComponent, SFC } from 'react';
import { Spring, animated, config } from 'react-spring';
import { Toggle } from 'react-powerplug';

import BaseAlert, { BaseAlertProps } from './BaseAlert';

export interface AlertProps extends BaseAlertProps {
  onClosed?: () => void;
}

const AnimatedAlert: SFC<AlertProps> = ({ onClosed, ...props }) => (
  <Toggle initial>
    {({ on, set }) => (
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
          x: on ? 1 : 0,
          height: on ? 'auto' : 0,
        }}
        config={{
          ...config.default,
          restSpeedThreshold: 1,
          restDisplacementThreshold: 0.1,
        }}
      >
        {({ x, height }) => (
          <animated.div
            style={{
              transform: x.interpolate((_x: number) => `scaleY(${_x})`),
              opacity: x,
              height,
            }}
          >
            <BaseAlert onClose={() => set(false)} {...props} />
          </animated.div>
        )}
      </Spring>
    )}
  </Toggle>
);

class Alert extends PureComponent<AlertProps, {}> {
  render() {
    const RenderComponent = this.props.closable ? AnimatedAlert : BaseAlert;
    return <RenderComponent {...this.props} />;
  }
}

export default Alert;
