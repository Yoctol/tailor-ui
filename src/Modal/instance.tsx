import React, { PureComponent, RefObject, createRef } from 'react';
import { render } from 'react-dom';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import Space from '../Grid/Space';
import ThemeProvider from '../utils/ThemeProvider';
import getTypeIcon, { Types } from '../utils/getTypeIcon';

import BaseModal from './BaseModal';
import Footer from './Footer';

let modalInstance: Modal;

type ModalTypes = Types | 'confirm';

export type ModalComponentProps = {
  type?: ModalTypes;
};

interface ModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalComponentState {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
  type: ModalTypes;
}

class ModalComponent extends PureComponent<
  ModalComponentProps,
  ModalComponentState
> {
  state: ModalComponentState = {
    visible: false,
    type: 'confirm',
    title: '',
    content: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {},
  };

  getIcon = () => {
    const { type } = this.state;
    return getTypeIcon(type === 'confirm' ? 'warning' : type, 32);
  };

  trigger = (options: ModalOptions, type: ModalTypes) =>
    new Promise(resolve =>
      this.setState(() => ({
        type,
        visible: true,
        title: '',
        content: '',
        confirmText: 'Confirm',
        cancelText: type === 'confirm' ? options.cancelText || 'Cancel' : '',
        onConfirm: () => {
          if (options.onConfirm) {
            options.onConfirm();
          } else {
            resolve(true);
          }
        },
        onCancel: () => {
          if (options.onCancel) {
            options.onCancel();
          } else {
            resolve(false);
          }
        },
      }))
    );

  closeModal = () => {
    this.setState(() => ({
      visible: false,
    }));
  };

  render() {
    const {
      visible,
      title,
      content,
      cancelText,
      confirmText,
      onCancel,
      onConfirm,
      type,
    } = this.state;

    const icon = this.getIcon();

    return (
      <ThemeProvider>
        <BaseModal
          clickOutsite={type === 'confirm'}
          visible={visible}
          onCancel={onCancel}
        >
          <Space p="3">
            <Flex>
              {icon}
              <Box flex="auto" ml="1">
                <Heading.h3>{title}</Heading.h3>
                <Space my="3">{content}</Space>
              </Box>
            </Flex>
            <Footer
              cancelText={cancelText}
              confirmText={confirmText}
              onCancel={() => {
                onCancel();
                this.closeModal();
              }}
              onConfirm={() => {
                onConfirm();
                this.closeModal();
              }}
            />
          </Space>
        </BaseModal>
      </ThemeProvider>
    );
  }
}

class Modal {
  ref: RefObject<ModalComponent> = createRef();

  constructor() {
    const elementRoot = document.createElement('div');
    document.body.appendChild(elementRoot);

    render(<ModalComponent ref={this.ref} />, elementRoot);
  }

  trigger = (options: ModalOptions, type: ModalTypes) => {
    if (this.ref.current) {
      this.ref.current.trigger(options, type);
    }
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
