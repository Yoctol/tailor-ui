import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, border, borderColor, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';
import { themeGet } from 'styled-system/dist/util';

import theme from '../theme';
import { shadowVariant } from '../utils/shadow';

const ModalToggle = styled.div`
  display: ${ifProp('show', 'block', 'none')};
`;

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

const Modal = ({ children, show, handleClose, ...otherProps }) => (
  <ModalToggle show={show}>
    <ModalOverlay onClick={handleClose} />
    <ModalContent {...otherProps}>{children}</ModalContent>
  </ModalToggle>
);

Modal.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  children: '',
};

export default Modal;
