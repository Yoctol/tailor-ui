import { Component } from 'react';

export interface ClickOutsideProps {
  onClickOutside: (e: Event) => void;
  bindRef?: HTMLElement;
  children:
    | React.ReactNode
    | ((
        renderProps: {
          bindRef: (ref: HTMLElement) => void;
        }
      ) => React.ReactNode);
}

class ClickOutside extends Component<ClickOutsideProps> {
  isTouch = false;

  container?: HTMLElement = this.props.bindRef;

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  handle = (event: Event) => {
    if (event.type === 'touchend') {
      this.isTouch = true;
    }

    if (event.type === 'click' && this.isTouch) {
      return;
    }

    const { onClickOutside } = this.props;

    const el = this.container;

    if (el && event.target && !el.contains(event.target as Node)) {
      onClickOutside(event);
    }
  };

  render() {
    const { children } = this.props;

    return typeof children === 'function'
      ? children({
          bindRef: ref => {
            this.container = ref;
          },
        })
      : children;
  }
}

export default ClickOutside;
