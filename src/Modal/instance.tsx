import React, { RefObject, createRef } from 'react';
import { render } from 'react-dom';

import ModalInstanceComponent, {
  IModalOptions,
  ModalTypes,
} from './ModalInstanceComponent';

let modalInstance: Modal;

class Modal {
  ref: RefObject<ModalInstanceComponent> = createRef();

  constructor() {
    const elementRoot = document.createElement('div');
    document.body.appendChild(elementRoot);

    render(<ModalInstanceComponent ref={this.ref} />, elementRoot);
  }

  trigger = (options: IModalOptions, type: ModalTypes): Promise<boolean> => {
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

const triggerModal = (options: IModalOptions, type: ModalTypes) => {
  const instance = getModalInstance();
  return instance.trigger(options, type);
};

export const confirm = (options: IModalOptions) =>
  triggerModal(options, 'confirm');
export const info = (options: IModalOptions) => triggerModal(options, 'info');
export const success = (options: IModalOptions) =>
  triggerModal(options, 'success');
export const warning = (options: IModalOptions) =>
  triggerModal(options, 'warning');
export const error = (options: IModalOptions) => triggerModal(options, 'error');
