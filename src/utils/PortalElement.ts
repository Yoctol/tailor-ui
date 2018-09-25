class PortalElement {
  element?: HTMLElement;

  canUseDOM = () =>
    !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    );

  getPortalElement = () => {
    if (!this.element) {
      this.element = document.createElement('div');
      document.body.appendChild(this.element);
    }

    return this.element;
  };
}

export default PortalElement;
