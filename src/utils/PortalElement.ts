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
      this.element.style.position = 'fixed';
      this.element.style.top = '0';
      this.element.style.left = '0';
      this.element.style.zIndex = '9999';

      document.body.appendChild(this.element);
    }

    return this.element;
  };
}

export default PortalElement;
