import React, { FC, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Stack } from '../Stack';

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
  defaultOrder?: number;
}

const Portal: FC<PortalProps> = ({ defaultOrder, children }) => {
  const elementRef = useRef<HTMLElement>();

  useEffect(
    () => () => {
      if (elementRef.current) {
        portalContainer.removeChild(elementRef.current);
      }
    },
    []
  );

  const getElement = useCallback(zIndex => {
    if (elementRef.current) {
      return elementRef.current;
    }

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('portal-container', '');
      document.body.appendChild(portalContainer);
    }

    elementRef.current = createMountNode(zIndex || 5);
    portalContainer.appendChild(elementRef.current);

    return elementRef.current;
  }, []);

  // This fixes SSR
  if (!canUseDom()) {
    return null;
  }

  return (
    <Stack defaultOrder={defaultOrder}>
      {stackingOrder => createPortal(children, getElement(stackingOrder))}
    </Stack>
  );
};

export { Portal };
