import React, { PureComponent, ReactNode, SFC } from 'react';
import styled from 'styled-components';
import { Transition, animated, config } from 'react-spring';
import { WidthProps, width as styledWidth, themeGet } from 'styled-system';

import Keydown from '../utils/Keydown';

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

const AnimatedModalOverlay = animated(ModalOverlay);

const ModalContent = styled<WidthProps, 'div'>('div')`
  display: flex;
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
  flex-direction: column;
  max-height: 90vh;
  border-radius: ${themeGet('radii.base')};
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgba(17, 17, 17, 0.2);
  transform: translate(-50%, -50%);

  ${styledWidth};
`;

const AnimatedModalContent = animated(ModalContent);

export type ModalWrapperProps = WidthProps & {
  opacity: number;
  pointerEvents?: string;
  onCancel: () => void;
  content?: ReactNode;
  clickOutsite?: boolean;
  [key: string]: any;
};

const ModalWrapper: SFC<ModalWrapperProps> = ({
  width = 416,
  opacity,
  pointerEvents,
  onCancel,
  content = '',
  clickOutsite = true,
  ...otherProps
}) => (
  <>
    <AnimatedModalOverlay
      style={{
        opacity,
        pointerEvents,
      }}
      onClick={() => {
        if (clickOutsite) {
          onCancel();
        }
      }}
    />
    <AnimatedModalContent
      style={{
        opacity,
        pointerEvents,
      }}
      width={width}
      {...otherProps}
    >
      {content}
    </AnimatedModalContent>
  </>
);

const ESC_KEY_CODE = 27;

export type BaseModalProps = WidthProps & {
  onCancel: () => void;
  clickOutsite?: boolean;
  visible: boolean;
};

class BaseModal extends PureComponent<BaseModalProps> {
  render() {
    const { children, visible, onCancel, ...otherProps } = this.props;

    return (
      <>
        {visible && <Keydown keyCode={ESC_KEY_CODE} handleKeydown={onCancel} />}
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
          onCancel={onCancel}
          content={children}
          {...otherProps}
        >
          {visible && ModalWrapper}
        </Transition>
      </>
    );
  }
}

export default BaseModal;
