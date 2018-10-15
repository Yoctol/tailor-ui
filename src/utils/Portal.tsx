import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

class Portal extends PureComponent {
  element: HTMLElement;

  constructor(props: any) {
    super(props);

    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '9999';

    document.body.appendChild(element);

    this.element = element;
  }

  canUseDOM = () =>
    !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    );

  getPortalElement = () => {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.style.position = 'fixed';
      this.element.style.top = '0';
      this.element.style.left = '0';
      this.element.style.zIndex = '9999';

      document.body.appendChild(this.element);
    }
  };

  render() {
    return this.canUseDOM() && createPortal(this.props.children, this.element);
  }
}

export default Portal;
