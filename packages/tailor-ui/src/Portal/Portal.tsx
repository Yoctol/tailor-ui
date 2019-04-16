import React, { Component } from 'react';
import { createPortal } from 'react-dom';

let portalContainer: HTMLDivElement;

const canUseDom = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

const createMountNode = (zIndex: string) => {
  const element = document.createElement('div');

  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.zIndex = zIndex;

  return element;
};

interface PortalProps {
  zIndex?: string;
}

class Portal extends Component<PortalProps> {
  element?: HTMLElement;

  constructor(props: PortalProps) {
    super(props);

    // This fixes SSR
    if (!canUseDom()) {
      return;
    }

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('portal-container', '');
      document.body.append(portalContainer);
    }

    this.element = createMountNode(props.zIndex || '9999');
    portalContainer.append(this.element);
  }

  componentWillUnmount() {
    if (this.element) {
      portalContainer.removeChild(this.element);
    }
  }

  render() {
    if (!(canUseDom() && this.element)) {
      return <></>;
    }

    return createPortal(this.props.children, this.element);
  }
}

export default Portal;
