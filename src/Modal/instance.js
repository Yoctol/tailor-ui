import React, { PureComponent } from 'react';
import { render } from 'react-dom';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import Space from '../Grid/Space';
import ThemeProvider from '../utils/ThemeProvider';
import getTypeIcon from '../utils/getTypeIcon';

import BaseModal from './BaseModal';
import Footer from './Footer';

let modalInstance;

class ModalComponent extends PureComponent {
  state = {
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

  trigger = (options, type) => {
    this.setState(() => {
      const cancelText =
        type === 'confirm' ? options.cancelText || 'Cancel' : null;

      return {
        title: '',
        content: '',
        confirmText: 'Confirm',
        onConfirm: () => {},
        onCancel: () => {},
        ...options,
        cancelText,
        type,
        visible: true,
      };
    });
  };

  handleClose = () => {
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

    const { handleClose, getIcon } = this;

    const icon = getIcon();

    return (
      <ThemeProvider>
        <BaseModal
          clickOutsite={type === 'confirm'}
          visible={visible}
          handleClose={handleClose}
        >
          <Space p="6">
            <Flex>
              {icon}
              <Box flex="auto" ml="2">
                <Heading.h3>{title}</Heading.h3>
                <Space mt="2" mb="4">
                  {content}
                </Space>
              </Box>
            </Flex>
            <Footer
              cancelText={cancelText}
              confirmText={confirmText}
              onCancel={() => {
                onCancel();
                handleClose();
              }}
              onConfirm={() => {
                onConfirm();
                handleClose();
              }}
            />
          </Space>
        </BaseModal>
      </ThemeProvider>
    );
  }
}

class Modal {
  constructor() {
    const elementRoot = document.createElement('div');
    document.body.appendChild(elementRoot);

    render(
      <ModalComponent
        ref={ref => {
          this.ref = ref;
        }}
      />,
      elementRoot
    );
  }

  trigger = (options, type) => this.ref.trigger(options, type);
}

const getModalInstance = () => {
  if (!modalInstance) {
    modalInstance = new Modal();
  }
  return modalInstance;
};

const triggerModal = (options, type) => {
  const instance = getModalInstance();
  return instance.trigger(options, type);
};

export const confirm = options => triggerModal(options, 'confirm');
export const info = options => triggerModal(options, 'info');
export const success = options => triggerModal(options, 'success');
export const warning = options => triggerModal(options, 'warning');
export const error = options => triggerModal(options, 'error');
