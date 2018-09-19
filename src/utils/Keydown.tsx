import { Component } from 'react';

export interface KeydownProps {
  handleKeydown: () => void;
  keyCode: number;
}

class Keydown extends Component<KeydownProps> {
  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = ({ keyCode }: KeyboardEvent) => {
    const { keyCode: targetKeyCode, handleKeydown } = this.props;
    if (keyCode === targetKeyCode) {
      handleKeydown();
    }
  };

  render() {
    return null;
  }
}

export default Keydown;
