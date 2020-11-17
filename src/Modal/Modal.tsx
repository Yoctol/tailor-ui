import React, { CSSProperties, FC } from 'react';

import { Flex } from '../Layout';

import AnimationModal, { AnimationModalProps } from './AnimationModal';
import ModalFooter, { ModalFooterProps } from './Footer';
import ModalHeader, { ModalHeaderProps } from './Header';

export type ModalProps = AnimationModalProps &
  ModalHeaderProps &
  ModalFooterProps & {
    zIndex?: number;
    contentStyle?: CSSProperties;
    footerStyle?: CSSProperties;
  };

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
  zIndex,
  contentStyle,
  footerStyle,
  ...props
}) => (
  <AnimationModal
    status={status}
    onCancel={onCancel}
    zIndex={zIndex}
    {...props}
  >
    <ModalHeader
      status={status}
      title={title}
      onCancel={onCancel}
      closable={closable}
    />
    <Flex
      flex="auto"
      flexDirection="column"
      overflowY="auto"
      mx="3"
      mb="24px"
      px="3"
      style={contentStyle}
    >
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
      style={footerStyle}
    />
  </AnimationModal>
);

export { Modal };
