import PropTypes from 'prop-types';
import React, { PureComponent, isValidElement } from 'react';
import { createPortal } from 'react-dom';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';

import BaseModal from './BaseModal';
import CloseButton from './CloseButton';
import Footer from './Footer';
import { confirm, error, info, success, warning } from './instance';

let MODAL_PORTAL_CONTAINER = null;

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class Modal extends PureComponent {
  renderHeader = () => {
    const { title, onCancel, closable } = this.props;

    return (
      <Flex
        flex="none"
        alignItems="center"
        px="3"
        py="2"
        borderBottom="base"
        borderColor="gray.8"
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

    if (footer === null) return null;

    return (
      <Box
        flex="none"
        alignItems="center"
        px="3"
        py="2"
        borderTop="base"
        borderColor="gray.8"
      >
        {isValidElement(footer) ? (
          footer
        ) : (
          <Footer
            cancelText={cancelText}
            confirmText={confirmText}
            onCancel={onCancel}
            onConfirm={onConfirm}
            confirmButtonProps={confirmButtonProps}
            cancelButtonProps={cancelButtonProps}
          />
        )}
      </Box>
    );
  };

  render() {
    if (!canUseDOM) {
      return null;
    }

    if (!MODAL_PORTAL_CONTAINER) {
      MODAL_PORTAL_CONTAINER = document.createElement('div');
      document.body.appendChild(MODAL_PORTAL_CONTAINER);
    }

    return createPortal(
      <BaseModal {...this.props}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </BaseModal>,
      MODAL_PORTAL_CONTAINER
    );
  }
}

Modal.confirm = confirm;
Modal.info = info;
Modal.success = success;
Modal.warning = warning;
Modal.error = error;

Modal.propTypes = {
  /**
   * The cancel button props
   */
  cancelButtonProps: PropTypes.shape({}), // FIXME
  /**
   * text of the Cancel button
   */
  cancelText: PropTypes.string,
  /**
   * The children of modal content
   */
  children: PropTypes.node,
  /**
   * Whether a close (x) button is visible on top right of the modal dialog or not
   */
  closable: PropTypes.bool,
  /**
   * The confirm button props
   */
  confirmButtonProps: PropTypes.shape({}), // FIXME
  /**
   * text of the Confirm button
   */
  confirmText: PropTypes.string,
  /**
   * Footer content, set as `footer={null}` when you don't need default buttons
   */
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]),
  /**
   * The modal dialog's title
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Whether the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Width of modal
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Specify a function that will be called when a user clicks mask,
   * close button on top right or Cancel button
   */
  onCancel: PropTypes.func,
  /**
   * callback of confirmation
   */
  onConfirm: PropTypes.func,
};

Modal.defaultProps = {
  closable: false,
  children: null,
  width: 416,
  footer: 'Default',
  title: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: () => {},
  confirmButtonProps: {},
  cancelButtonProps: {},
};

export default Modal;
