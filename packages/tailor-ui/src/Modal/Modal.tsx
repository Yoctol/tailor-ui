import React, {
  FunctionComponent,
  ReactNode,
  isValidElement,
  useContext,
} from 'react';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import Portal from '../Portal';
import { LocaleContext } from '../UIProvider';

import BaseModal, { BaseModalProps } from './BaseModal';
import CloseButton from './CloseButton';
import Footer, { FooterProps } from './Footer';
import { confirm, error, info, success, warning } from './instance';

interface ModalHeaderProps {
  title?: ReactNode;
  closable?: boolean;
  onCancel: () => void;
}

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  title,
  onCancel,
  closable,
}) => (
  <Flex
    flex="none"
    alignItems="center"
    px="3"
    py="2"
    borderBottom="base"
    borderColor="gray300"
  >
    <Box flex="auto">
      <Heading.h4>{title}</Heading.h4>
    </Box>
    {closable && <CloseButton onCancel={onCancel} />}
  </Flex>
);

export const ModalContent: FunctionComponent = ({ children }) => (
  <Flex flex="auto" flexDirection="column" p="3" overflowY="auto">
    {children}
  </Flex>
);

export const FooterWrapper: FunctionComponent = props => (
  <Flex
    flex="none"
    alignItems="center"
    px="3"
    py="2"
    borderTop="base"
    borderColor="gray300"
    {...props}
  />
);

interface ModalFooterProps extends FooterProps {
  footer?: ReactNode;
}

const ModalFooter: FunctionComponent<ModalFooterProps> = ({
  footer,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => {
  const { locale } = useContext(LocaleContext);

  return footer === null ? null : (
    <FooterWrapper>
      {isValidElement(footer) ? (
        footer
      ) : (
        <Footer
          cancelText={cancelText || locale.Modal.cancelText}
          confirmText={confirmText || locale.Modal.confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmButtonProps={confirmButtonProps}
          cancelButtonProps={cancelButtonProps}
        />
      )}
    </FooterWrapper>
  );
};

export type ModalProps = BaseModalProps &
  FooterProps &
  ModalHeaderProps &
  ModalFooterProps;

const Modal: FunctionComponent<ModalProps> & {
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
