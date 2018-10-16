import { Component } from 'react';

export interface IClickOutsideProps {
  onClickOutside: (e: Event) => void;
  bindRef?: HTMLElement;
  bindRefs?: Array<HTMLElement | undefined>;
  children:
    | ((
        renderProps: {
          bindRef: (ref: any) => void;
        }
      ) => React.ReactNode)
    | React.ReactNode;
}

class ClickOutside extends Component<IClickOutsideProps> {
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

    const { onClickOutside, bindRef, bindRefs } = this.props;

    if ((bindRef || this.container) && !bindRefs) {
      const el = bindRef || this.container;
      if (el && event.target && !el.contains(event.target as Node)) {
        onClickOutside(event);
      }
    }

    if (!bindRef && bindRefs) {
      let isClickOutside = true;

      bindRefs.forEach(container => {
        isClickOutside =
          isClickOutside &&
          !!(
            container &&
            event.target &&
            !container.contains(event.target as Node)
          );
      });

      if (isClickOutside) {
        onClickOutside(event);
      }
    }
  };

  render() {
    const { children } = this.props;

    return children instanceof Function
      ? children({
          bindRef: ref => {
            this.container = ref;
          },
        })
      : children;
  }
}

export default ClickOutside;
