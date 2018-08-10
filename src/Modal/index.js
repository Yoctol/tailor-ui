import PropTypes from 'prop-types';
import React from 'react';

import BaseModal from './BaseModal';

const Modal = props => <BaseModal {...props} />;

Modal.propTypes = {
  /**
   * The children of modal content
   */
  children: PropTypes.node,
  /**
   * Whether a close (x) button is visible on top right of the modal dialog or not
   */
  closable: PropTypes.bool,
  /**
   * The function will be triggerd when user click outside of the modal or press ESC key
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Whether the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Width of modal
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Modal.defaultProps = {
  closable: false,
  children: null,
  width: 416,
};

export default Modal;
