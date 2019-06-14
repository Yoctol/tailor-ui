import React, { FunctionComponent, ReactNode, isValidElement } from 'react';

import { Flex } from '../Layout';
import { Heading } from '../Typography';
import { useLocale } from '../locale';

import BaseModal, { BaseModalProps } from './BaseModal';
import CloseButton from './CloseButton';
import Footer, { FooterProps } from './Footer';

interface ModalHeaderProps {
  title?: ReactNode;
  icon?: JSX.Element | null;
  closable?: boolean;
  onCancel: () => void;
}

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  title,
  icon,
  onCancel,
  closable,
}) => (
  <Flex flex="none" alignItems="center" mb="3" mx="3">
    {icon && <Flex mr="2">{icon}</Flex>}
    <Flex flex="auto">
      <Heading.h3>{title}</Heading.h3>
    </Flex>
    {closable && <CloseButton onCancel={onCancel} />}
  </Flex>
);

export const ModalContent: FunctionComponent = ({ children }) => (
  <Flex flex="auto" flexDirection="column" overflowY="auto" px="3">
    {children}
  </Flex>
);

export const FooterWrapper: FunctionComponent = props => (
  <Flex
    flex="none"
    alignItems="center"
    mt="24px"
    mx="3"
    pt="3"
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
  closable,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
}) => {
  const { locale } = useLocale();

  return footer === null ? null : (
    <FooterWrapper>
      {isValidElement(footer) ? (
        footer
      ) : (
        <Footer
          closable={closable}
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

const Modal: FunctionComponent<ModalProps> = ({
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
  <BaseModal onCancel={onCancel} {...props}>
    <ModalHeader title={title} onCancel={onCancel} closable={closable} />
    <ModalContent>{children}</ModalContent>
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
  </BaseModal>
);

export { Modal };
