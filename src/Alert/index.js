import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Spring, animated, config } from 'react-spring';
import { Toggle } from 'react-powerplug';
import { space } from 'styled-system';

import BaseAlert from './BaseAlert';

const AnimatedAlert = ({ onClosed, ...otherProps }) => (
  <Toggle initial>
    {({ on, set }) => (
      <Spring
        native
        onRest={({ height }) => height === 0 && onClosed()}
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
        {...otherProps}
      >
        {({ transform, opacity, display, height, ...props }) => (
          <animated.div style={{ transform, opacity, display, height }}>
            <BaseAlert onClose={() => set(false)} {...props} />
          </animated.div>
        )}
      </Spring>
    )}
  </Toggle>
);

class Alert extends PureComponent {
  render() {
    const RenderComponent = this.props.closable ? AnimatedAlert : BaseAlert;

    return <RenderComponent {...this.props} />;
  }
}

Alert.propTypes = {
  /**
   * Whether Alert can be closed
   */
  closable: PropTypes.bool,
  /**
   * Content of Alert
   */
  message: PropTypes.string.isRequired,
  /**
   * Type of Alert styles
   */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /**
   * Callback executed when close animation is completed
   */
  onClosed: PropTypes.func,
  ...space.propTypes,
};

Alert.defaultProps = {
  closable: false,
  onClosed: () => {},
  type: 'info',
};

export default Alert;
