import React, { PureComponent } from 'react';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import Space from '../Grid/Space';
import UIProvider, { globalLocale } from '../UIProvider';
import getTypeIcon, { Types } from '../utils/getTypeIcon';

import BaseModal from './BaseModal';
import Footer from './Footer';

export type ModalTypes = Types | 'confirm';

export interface ModalComponentProps {
  type?: ModalTypes;
}

export interface ModalOptions {
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
  cancelText?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
  type: ModalTypes;
}

class ModalInstanceComponent extends PureComponent<
  ModalComponentProps,
  ModalComponentState
> {
  state: ModalComponentState = {
    visible: false,
    type: 'confirm',
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {},
  };

  getIcon = () => {
    const { type } = this.state;
    return getTypeIcon(type === 'confirm' ? 'warning' : type, 32);
  };

  trigger = (options: ModalOptions, type: ModalTypes): Promise<boolean> =>
    new Promise(resolve =>
      this.setState(() => ({
        type,
        visible: true,
        title: options.title || '',
        content: options.content || '',
        confirmText: options.confirmText || globalLocale.Modal.confirmText,
        cancelText:
          type === 'confirm'
            ? options.cancelText || globalLocale.Modal.cancelText
            : null,
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
      <UIProvider skipLocale>
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
      </UIProvider>
    );
  }
}

export default ModalInstanceComponent;
