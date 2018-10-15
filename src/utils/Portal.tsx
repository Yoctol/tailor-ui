import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

const elements: {
  [key: string]: HTMLElement;
} = {};

class Portal extends PureComponent<{
  appendFor?: string;
}> {
  element?: HTMLElement;

  canUseDOM = () =>
    !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    );

  createMountElement = () => {
    const element = document.createElement('div');

    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '9999';

    document.body.appendChild(element);

    return element;
  };

  getPortalElement = () => {
    const { appendFor } = this.props;

    if (appendFor && elements[appendFor]) {
      return elements[appendFor];
    }

    if (this.element) {
      return this.element;
    }

    const element = this.createMountElement();

    if (appendFor) {
      elements[appendFor] = element;
    } else {
      this.element = element;
    }

    return element;
  };

  render() {
    return (
      this.canUseDOM() &&
      createPortal(this.props.children, this.getPortalElement())
    );
  }
}

export default Portal;
