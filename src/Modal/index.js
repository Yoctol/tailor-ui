import React from 'react';
import PropTypes from 'prop-types';

import ModalWithAnimation from './ModalWithAnimation';
import ModalWithoutAnimation from './ModalWithoutAnimation';

const Modal = ({ animation = false, ...otherProps }) => {
  const BaseModal = animation ? ModalWithAnimation : ModalWithoutAnimation;
  return <BaseModal {...otherProps} />;
};

Modal.propTypes = {
  animation: PropTypes.bool,
};

Modal.defaultProps = {
  animation: false,
};

export default Modal;
