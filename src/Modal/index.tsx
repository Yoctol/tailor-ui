import React, { ReactNode, SFC, isValidElement } from 'react';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import Portal from '../utils/Portal';
import { LocaleConsumer } from '../UIProvider';

import BaseModal, { BaseModalProps } from './BaseModal';
import CloseButton from './CloseButton';
import Footer, { IFooterProps } from './Footer';
import { confirm, error, info, success, warning } from './instance';

interface IModalHeaderProps {
  title?: ReactNode;
  closable?: boolean;
  onCancel: () => void;
}

const ModalHeader: SFC<IModalHeaderProps> = ({ title, onCancel, closable }) => (
  <Flex
    flex="none"
    alignItems="center"
    px="3"
    py="2"
    borderBottom="base"
    borderColor="gray300"
  >
    <Box flex="auto">
      <Heading.h3>{title}</Heading.h3>
    </Box>
    {closable && <CloseButton onCancel={onCancel} />}
  </Flex>
);

const ModalContent: SFC = ({ children }) => (
  <Flex flexDirection="column" p="3" overflowY="auto">
    {children}
  </Flex>
);

interface IModalFooterProps extends IFooterProps {
  footer?: ReactNode;
}

const ModalFooter: SFC<IModalFooterProps> = ({
  footer,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) =>
  footer === null ? null : (
    <Flex
      flex="none"
      alignItems="center"
      px="3"
      py="2"
      borderTop="base"
      borderColor="gray300"
    >
      {isValidElement(footer) ? (
        footer
      ) : (
        <LocaleConsumer>
          {({ locale }) => (
            <Footer
              cancelText={cancelText || locale.Modal.cancelText}
              confirmText={confirmText || locale.Modal.confirmText}
              onCancel={onCancel}
              onConfirm={onConfirm}
              confirmButtonProps={confirmButtonProps}
              cancelButtonProps={cancelButtonProps}
            />
          )}
        </LocaleConsumer>
      )}
    </Flex>
  );

export type ModalProps = BaseModalProps &
  IFooterProps &
  IModalHeaderProps &
  IModalFooterProps;

const Modal: SFC<ModalProps> & {
  confirm: typeof confirm;
  info: typeof info;
  success: typeof success;
  warning: typeof warning;
  error: typeof error;
} = ({
  title,
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
  <Portal>
    <BaseModal onCancel={onCancel} {...props}>
      <ModalHeader title={title} onCancel={onCancel} closable={closable} />
      <ModalContent>{children}</ModalContent>
      <ModalFooter
        footer={footer}
        cancelText={cancelText}
        confirmText={confirmText}
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmButtonProps={confirmButtonProps}
        cancelButtonProps={cancelButtonProps}
      />
    </BaseModal>
  </Portal>
);

Modal.confirm = confirm;
Modal.info = info;
Modal.success = success;
Modal.warning = warning;
Modal.error = error;

export default Modal;
