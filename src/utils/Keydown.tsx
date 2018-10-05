import { Component } from 'react';

export interface IKeydownProps {
  handleKeydown: () => void;
  keyCode: number;
}

class Keydown extends Component<IKeydownProps> {
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
