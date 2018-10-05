import React, { PureComponent, ReactNode, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { omit } from 'ramda';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';
import PortalElement from '../utils/PortalElement';
import { LocaleConsumer } from '../UIProvider';

import BaseModal, { BaseModalProps } from './BaseModal';
import CloseButton from './CloseButton';
import Footer, { IFooterProps } from './Footer';
import { confirm, error, info, success, warning } from './instance';

const portalElement = new PortalElement();

export type ModalProps = BaseModalProps &
  IFooterProps & {
    title?: ReactNode;
    footer?: ReactNode;
    closable?: boolean;
  };

class Modal extends PureComponent<ModalProps> {
  static confirm: typeof confirm = confirm;

  static info: typeof info = info;

  static success: typeof success = success;

  static warning: typeof warning = warning;

  static error: typeof error = error;

  static defaultProps = {
    title: 'test',
  };

  renderHeader = () => {
    const { title, onCancel, closable } = this.props;

    return (
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
  };

  renderContent = () => {
    const { children } = this.props;

    return (
      <Flex flexDirection="column" p="3" overflowY="auto">
        {children}
      </Flex>
    );
  };

  renderFooter = () => {
    const {
      footer,
      cancelText,
      confirmText,
      onCancel,
      onConfirm,
      confirmButtonProps,
      cancelButtonProps,
    } = this.props;

    if (footer === null) {
      return null;
    }

    return (
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
  };

  render() {
    if (!portalElement.canUseDOM()) {
      return null;
    }

    const props = omit(['title'], this.props);

    return createPortal(
      <BaseModal {...props}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </BaseModal>,
      portalElement.getPortalElement()
    );
  }
}

export default Modal;
