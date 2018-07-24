import PropTypes from 'prop-types';
import { Component } from 'react';

class Keydown extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = ({ keyCode }) => {
    const { keyCode: targetKeyCode, handleKeydown } = this.props;
    if (keyCode === targetKeyCode) {
      handleKeydown();
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
