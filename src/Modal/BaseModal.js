import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated, config } from 'react-spring';
import { space, themeGet, width } from 'styled-system';

import Keydown from '../utils/Keydown';

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
  border-radius: ${themeGet('radii.1')};
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgba(17, 17, 17, 0.2);
  transform: translate(-50%, -50%);

  ${width};
`;

ModalContent.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
};

ModalContent.defaultProps = {
  width: 416,
};

const AnimatedModalContent = animated(ModalContent);

const ModalWrapper = ({
  opacity,
  translateY,
  pointerEvents,
  handleClose,
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
      }}
      {...otherProps}
    >
      {content}
    </AnimatedModalContent>
  </>
);

const ESC_KEY_CODE = 27;

class BaseModal extends PureComponent {
  render() {
    const { children, visible, handleClose, ...otherProps } = this.props;

    return (
      <>
        {visible && (
          <Keydown keyCode={ESC_KEY_CODE} handleKeydown={handleClose} />
        )}
        <Transition
          native
          keys={visible ? 'visible' : 'hide'}
          from={{
            opacity: 0,
          }}
          enter={{
            opacity: 1,
          }}
          leave={{
            opacity: 0,
            pointerEvents: 'none',
          }}
          config={config.stiff}
          handleClose={handleClose}
          content={children}
          {...otherProps}
        >
          {visible ? ModalWrapper : null}
        </Transition>
      </>
    );
  }
}

BaseModal.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

BaseModal.defaultProps = {
  children: null,
};

export default BaseModal;
