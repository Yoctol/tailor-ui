import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, border, borderColor, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';
import { themeGet } from 'styled-system/dist/util';
import CloseIcon from 'react-icons/lib/md/close';
import { Flex } from 'grid-styled';

import Keydown from '../utils/Keydown';
import theme from '../theme';
import { shadowVariant } from '../utils/shadow';

const ModalToggle = styled.div`
  display: ${ifProp('show', 'block', 'none')};
`;

const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  padding: 5px;
  border: 0;
  color: #94989e;
  cursor: pointer;

  :focus {
    outline: 0;
  }
`;

const CloseButton = ({ handleClose }) => (
  <Flex flexDirection="row-reverse" mb="-15px">
    <CloseBtn onClick={handleClose}>
      <CloseIcon size="20" />
    </CloseBtn>
  </Flex>
);

CloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
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
  background-color: #fff;
  transform: translate(-50%, -50%);

  ${shadowVariant(0.2)}
  ${space}
  ${border}
  ${borderColor}
  ${borderRadius};
`;

ModalContent.propTypes = {
  ...space.propTypes,
  ...border.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
};

ModalContent.defaultProps = {
  theme,
  border: 'default',
  borderRadius: 2,
  borderColor: 'border',
};

const ESC_KEY_CODE = 27;

const Modal = ({ children, show, handleClose, closeButton, ...otherProps }) => (
  <Keydown keyCode={ESC_KEY_CODE} handleKeydown={() => show && handleClose()}>
    <ModalToggle show={show}>
      <ModalOverlay onClick={handleClose} />
      <ModalContent {...otherProps}>
        {closeButton && <CloseButton handleClose={handleClose} />}
        {children}
      </ModalContent>
    </ModalToggle>
  </Keydown>
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
