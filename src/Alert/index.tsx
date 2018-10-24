import React, { PureComponent, SFC } from 'react';
import { Spring, animated, config } from 'react-spring';
import { Toggle } from 'react-powerplug';

import BaseAlert, { IBaseAlertProps } from './BaseAlert';

export interface IAlertProps extends IBaseAlertProps {
  onClosed?: () => void;
}

const ClosableAlert: SFC<IAlertProps> = ({ onClosed, ...props }) => (
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
          precision: 0.1,
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

class Alert extends PureComponent<IAlertProps, {}> {
  render() {
    const RenderComponent = this.props.closable ? ClosableAlert : BaseAlert;
    return <RenderComponent {...this.props} />;
  }
}

export default Alert;
