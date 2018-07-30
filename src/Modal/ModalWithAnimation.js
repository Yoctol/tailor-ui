import Close from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';
import { space, width } from 'styled-system';
import { themeGet } from 'styled-system/dist/util';

import Icon from '../Icon';
import Keydown from '../utils/Keydown';

const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  transform: rotate(0deg);
  transition: all 0.2s ease-in;
  cursor: pointer;

  :focus {
    outline: 0;
  }

  :hover {
    transform: rotate(90deg);
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

const AnimatedModalOverlay = animated(ModalOverlay);

const ModalContent = styled.div`
  display: flex;
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
  flex-direction: column;
  max-height: 90vh;
  border: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
  border-radius: ${themeGet('radii.2')};
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgba(17, 17, 17, 0.2);

  ${space};
  ${width};
`;

ModalContent.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
};

ModalContent.defaultProps = {
  p: 8,
  width: 416,
};

const AnimatedModalContent = animated(ModalContent);

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
    <AnimatedModalOverlay
      style={{
        opacity,
        pointerEvents,
      }}
      onClick={handleClose}
    />
    <AnimatedModalContent
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
    </AnimatedModalContent>
  </>
);

const ESC_KEY_CODE = 27;

class Modal extends PureComponent {
  render() {
    const { children, show, handleClose, ...otherProps } = this.props;

    return (
      <>
        {show && <Keydown keyCode={ESC_KEY_CODE} handleKeydown={handleClose} />}
        <Transition
          native
          keys={show ? 'show' : 'hide'}
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
          {show ? ModalWrapper : null}
        </Transition>
      </>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  closeButton: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  closeButton: false,
  children: null,
};

export default Modal;
