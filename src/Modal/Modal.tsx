import React, { FC } from 'react';

import { Flex } from '../Layout';

import AnimationModal, { AnimationModalProps } from './AnimationModal';
import ModalFooter, { ModalFooterProps } from './Footer';
import ModalHeader, { ModalHeaderProps } from './Header';

export type ModalProps = AnimationModalProps &
  ModalHeaderProps &
  ModalFooterProps;

const Modal: FC<ModalProps> = ({
  title,
  status,
  onCancel,
  onConfirm,
  closable,
  children,
  footer,
  cancelText,
  confirmText,
  confirmButtonProps,
  cancelButtonProps,
  ...props
}) => (
  <AnimationModal status={status} onCancel={onCancel} {...props}>
    <ModalHeader
      status={status}
      title={title}
      onCancel={onCancel}
      closable={closable}
    />
    <Flex flex="auto" flexDirection="column" overflowY="auto" px="3">
      {children}
    </Flex>
    <ModalFooter
      footer={footer}
      closable={closable}
      cancelText={cancelText}
      confirmText={confirmText}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmButtonProps={confirmButtonProps}
      cancelButtonProps={cancelButtonProps}
    />
  </AnimationModal>
);

export { Modal };