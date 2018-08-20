import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';
import Heading from '../Heading';

import BaseModal from './BaseModal';
import CloseButton from './CloseButton';
import Footer from './Footer';
import { confirm, error, info, success, warning } from './instance';

class Modal extends PureComponent {
  renderHeader = () => {
    const { title, handleClose, closable } = this.props;
    return (
      <Flex px="4" py="3" borderBottom="default" borderColor="gray.8">
        <Box flex="auto">
          <Heading.h3>{title}</Heading.h3>
        </Box>
        {closable && <CloseButton handleClose={handleClose} />}
      </Flex>
    );
  };

  renderContent = () => {
    const { children } = this.props;
    return (
      <Flex flexDirection="column" p="4">
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

    return (
      footer && (
        <Box px="4" py="3" borderTop="default" borderColor="gray.8">
          <Footer
            cancelText={cancelText}
            confirmText={confirmText}
            onCancel={onCancel}
            onConfirm={onConfirm}
            confirmButtonProps={confirmButtonProps}
            cancelButtonProps={cancelButtonProps}
          />
        </Box>
      )
    );
  };

  render() {
    return (
      <BaseModal {...this.props}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </BaseModal>
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
   * The function will be triggerd when user click outside of the modal or press ESC key
   */
  handleClose: PropTypes.func.isRequired,
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
   * callback of cancel
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
  footer: Footer,
  title: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: () => {},
  confirmButtonProps: {},
  cancelButtonProps: {},
};

export default Modal;
