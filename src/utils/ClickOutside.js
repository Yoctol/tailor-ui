import PropTypes from 'prop-types';
import { Component } from 'react';
import { renderProps } from 'react-powerplug';

class ClickOutside extends Component {
  isTouch = false;

  container = null;

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  handleRef = ref => {
    this.container = ref;
  };

  handle = event => {
    if (event.type === 'touchend') {
      this.isTouch = true;
    }

    if (event.type === 'click' && this.isTouch) {
      return;
    }

    const { onClickOutside } = this.props;
    const el = this.container;

    if (el && !el.contains(event.target)) {
      onClickOutside(event);
    }
  };

  render() {
    const { onClickOutside, ...props } = this.props;
    return renderProps(props, {
      bind: {
        ref: this.handleRef,
      },
    });
  }
}

ClickOutside.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
};

export default ClickOutside;
