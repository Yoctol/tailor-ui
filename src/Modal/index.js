import PropTypes from 'prop-types';
import React from 'react';

import ModalWithAnimation from './ModalWithAnimation';
import ModalWithoutAnimation from './ModalWithoutAnimation';

const Modal = ({ animation, ...otherProps }) => {
  const BaseModal = animation ? ModalWithAnimation : ModalWithoutAnimation;
  return <BaseModal {...otherProps} />;
};

Modal.propTypes = {
  /**
   * Apply animation effects or not
   */
  animation: PropTypes.bool,
  /**
   * The children of modal content
   */
  children: PropTypes.node,
  /**
   * Whether a close (x) button is visible on top right of the modal dialog or not
   */
  closeButton: PropTypes.bool,
  /**
   * The function will be triggerd when user click outside of the modal or press ESC key
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Whether the modal is show or not
   */
  show: PropTypes.bool.isRequired,
  /**
   * Width of modal
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Modal.defaultProps = {
  animation: true,
  closeButton: false,
  children: null,
  width: 416,
};

export default Modal;
