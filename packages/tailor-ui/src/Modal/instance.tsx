import React, { RefObject, createRef } from 'react';
import { render } from 'react-dom';

import ModalInstanceComponent, {
  ModalOptions,
  ModalTypes,
} from './ModalInstanceComponent';

let modalInstance: Modal;

class Modal {
  ref: RefObject<ModalInstanceComponent> = createRef();

  constructor() {
    const elementRoot = document.createElement('div');
    elementRoot.style.position = 'fixed';
    elementRoot.style.top = '0';
    elementRoot.style.left = '0';
    elementRoot.style.zIndex = '9999';
    document.body.appendChild(elementRoot);

    render(<ModalInstanceComponent ref={this.ref} />, elementRoot);
  }

  trigger = (options: ModalOptions, type: ModalTypes): Promise<boolean> => {
    if (this.ref.current) {
      return this.ref.current.trigger(options, type);
    }

    return Promise.resolve(false);
  };
}

const getModalInstance = () => {
  if (!modalInstance) {
    modalInstance = new Modal();
  }
  return modalInstance;
};

const triggerModal = (options: ModalOptions, type: ModalTypes) => {
  const instance = getModalInstance();
  return instance.trigger(options, type);
};

export const confirm = (options: ModalOptions) =>
  triggerModal(options, 'confirm');
export const info = (options: ModalOptions) => triggerModal(options, 'info');
export const success = (options: ModalOptions) =>
  triggerModal(options, 'success');
export const warning = (options: ModalOptions) =>
  triggerModal(options, 'warning');
export const error = (options: ModalOptions) => triggerModal(options, 'error');
