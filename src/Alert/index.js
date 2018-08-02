import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Spring } from 'react-spring';
import { Toggle } from 'react-powerplug';
import { space } from 'styled-system';

import BaseAlert from './BaseAlert';

class Alert extends PureComponent {
  renderClosableAlert = () => (
    <Toggle initial>
      {({ on, set }) => (
        <Spring
          native
          from={{ transform: 'scale(1, 1)', opacity: 1, height: 'auto' }}
          to={{
            transform: on ? 'scale(1, 1)' : 'scale(1, 0)',
            opacity: on ? 1 : 0,
            height: on ? 'auto' : 0,
          }}
          {...this.props}
        >
          {({ transform, opacity, height, ...props }) => (
            <BaseAlert
              styles={{ transform, opacity, height }}
              onClose={() => set(false)}
              {...props}
            />
          )}
        </Spring>
      )}
    </Toggle>
  );

  renderAlert = () => <BaseAlert {...this.props} />;

  render() {
    return this.props.closable
      ? this.renderClosableAlert()
      : this.renderAlert();
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
  ...space.propTypes,
};

Alert.defaultProps = {
  closable: false,
  type: 'info',
};

export default Alert;
