import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import { themeGet } from 'styled-system/dist/util';
import Close from 'react-icons/lib/md/close';
import { Transition, animated } from 'react-spring';

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

const ModalOverlay = styled(animated.div)`
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(17, 17, 17, 0.25);
`;

const ModalContent = styled(animated.div)`
  display: flex;
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
  flex-direction: column;
  max-height: 90vh;
  padding: ${themeGet('space.spacingLg')};
  border: ${themeGet('borders.default')} ${themeGet('colors.border')};
  border-radius: ${themeGet('radii.2')};
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgba(17, 17, 17, 0.2);

  ${space};
`;

ModalContent.propTypes = {
  ...space.propTypes,
};

ModalContent.defaultProps = {
  p: 7,
};

const ModalWrapper = ({
  opacity,
  translateY,
  pointerEvents,
  handleClose,
  closeButton,
  content,
  ...otherProps
}) => (
  <>
    <ModalOverlay
      style={{
        opacity,
        pointerEvents,
      }}
      onClick={handleClose}
    />
    <ModalContent
      style={{
        opacity,
        pointerEvents,
        transform: translateY.interpolate(
          y => `translate(-50%, calc(-50% - ${y}px))`
        ),
      }}
      {...otherProps}
    >
      {closeButton && <CloseButton handleClose={handleClose} />}
      {content}
    </ModalContent>
  </>
);

const ESC_KEY_CODE = 27;

const Modal = ({ children, show, handleClose, ...otherProps }) => (
  <>
    <Keydown
      keyCode={ESC_KEY_CODE}
      handleKeydown={() => show && handleClose()}
    />
    <Transition
      native
      keys={show}
      from={{
        opacity: 0,
        translateY: 150,
      }}
      enter={{
        opacity: 1,
        translateY: 0,
      }}
      leave={{
        opacity: 0,
        translateY: 150,
        pointerEvents: 'none',
      }}
      config={{
        tension: 120,
        friction: 14,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.01,
      }}
      handleClose={handleClose}
      content={children}
      {...otherProps}
    >
      {show && ModalWrapper}
    </Transition>
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
