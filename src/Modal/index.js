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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  max-height: 90vh;
  padding: ${themeGet('space.spacingLg')};
  flex-direction: column;
  background-color: #fff;
  ${shadowVariant(0.2)}
  ${space}
  ${border}
  ${borderColor}
  ${borderRadius};
  transform: translate(-50%, -50%);
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

const Modal = ({ children, show, handleClose, ...other }) => (
  <ModalToggle show={show}>
    <ModalOverlay onClick={handleClose} />
    <ModalContent {...other}>{children}</ModalContent>
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
