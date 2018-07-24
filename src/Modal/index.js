import PropTypes from 'prop-types';
import React from 'react';

import ModalWithAnimation from './ModalWithAnimation';
import ModalWithoutAnimation from './ModalWithoutAnimation';

const Modal = ({ animation, ...otherProps }) => {
  const BaseModal = animation ? ModalWithAnimation : ModalWithoutAnimation;
  return <BaseModal {...otherProps} />;
};

Modal.propTypes = {
  animation: PropTypes.bool,
};

Modal.defaultProps = {
  animation: true,
};

export default Modal;
