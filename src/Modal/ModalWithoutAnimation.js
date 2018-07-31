import Close from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { space, themeGet } from 'styled-system';

import Icon from '../Icon';
import Keydown from '../utils/Keydown';

const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px;
  border: 0;
  cursor: pointer;

  :focus {
    outline: 0;
  }
`;

const CloseButton = ({ handleClose }) => (
  <CloseBtn onClick={handleClose}>
    <Icon cursor="pointer" type={Close} />
  </CloseBtn>
);

CloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(17, 17, 17, 0.25);
`;

const ModalContent = styled.div`
  display: flex;
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
  flex-direction: column;
  max-height: 90vh;
  padding: ${themeGet('space.spacingLg')};
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
  border-radius: ${themeGet('radii.2')};
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgba(17, 17, 17, 0.2);
  transform: translate(-50%, -50%);
  ${space};
`;

ModalContent.propTypes = {
  ...space.propTypes,
};

ModalContent.defaultProps = {
  p: 7,
};

const ESC_KEY_CODE = 27;

const Modal = ({ children, show, handleClose, closeButton, ...otherProps }) => (
  <>
    <Keydown
      keyCode={ESC_KEY_CODE}
      handleKeydown={() => show && handleClose()}
    />

    {show && (
      <>
        <ModalOverlay onClick={handleClose} />
        <ModalContent {...otherProps}>
          {closeButton && <CloseButton handleClose={handleClose} />}
          {children}
        </ModalContent>
      </>
    )}
  </>
);

Modal.propTypes = {
  children: PropTypes.node,
  closeButton: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  closeButton: false,
  children: '',
};

export default Modal;
