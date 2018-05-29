import { Component } from 'react';
import PropTypes from 'prop-types';

class Keydown extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = ({ keyCode }) => {
    if (keyCode === this.props.keyCode) {
      this.props.handleKeydown();
    }
  };

  render() {
    return null;
  }
}

Keydown.propTypes = {
  handleKeydown: PropTypes.func.isRequired,
  keyCode: PropTypes.number.isRequired,
};

export default Keydown;
