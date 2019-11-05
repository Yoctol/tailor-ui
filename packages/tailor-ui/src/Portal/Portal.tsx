import { FC, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

let portalContainer: HTMLDivElement;

const canUseDom = () =>
  Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  );

const createMountNode = (zIndex: number) => {
  const element = document.createElement('div');

  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.zIndex = String(zIndex);

  return element;
};

interface PortalProps {
  zIndex?: number;
}

const Portal: FC<PortalProps> = ({ zIndex, children }) => {
  const elementRef = useRef<HTMLElement>();

  useEffect(
    () => () => {
      if (elementRef.current) {
        portalContainer.removeChild(elementRef.current);
      }
    },
    []
  );

  const getElement = useCallback(() => {
    if (elementRef.current) {
      return elementRef.current;
    }

    // This fixes SSR
    if (!canUseDom()) {
      return null;
    }

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('portal-container', '');
      document.body.appendChild(portalContainer);
    }

    elementRef.current = createMountNode(zIndex || 5);
    portalContainer.appendChild(elementRef.current);

    return elementRef.current;
  }, [zIndex]);

  const element = getElement();

  if (!(canUseDom() && element)) {
    return null;
  }

  return createPortal(children, element);
};

export { Portal };
