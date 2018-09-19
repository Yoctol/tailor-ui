import React, { SFC, PureComponent } from 'react';
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
        onRest={({ height }: any) => {
          if (height === 0 && onClosed) {
            onClosed();
          }
        }}
        from={{ transform: 'scale(1, 1)', opacity: 1, height: 'auto' }}
        to={{
          transform: on ? 'scale(1, 1)' : 'scale(1, 0)',
          opacity: on ? 1 : 0,
          height: on ? 'auto' : 0,
        }}
        config={{
          ...config.default,
          restSpeedThreshold: 1,
          restDisplacementThreshold: 0.01,
        }}
      >
        {({ transform, opacity, display, height }) => (
          <animated.div style={{ transform, opacity, display, height }}>
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
