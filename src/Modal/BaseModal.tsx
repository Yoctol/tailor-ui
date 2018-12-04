import React, { FunctionComponent, ReactNode } from 'react';
import { Transition, animated, config } from 'react-spring';
import { WidthProps, width as styledWidth } from 'styled-system';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import useKeydown, { ESC_KEY_CODE } from 'utils/useKeydown';

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

const ModalContent = styled<WidthProps, 'div'>(tag.div)`
  display: flex;
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
  flex-direction: column;
  max-height: 90vh;
  border-radius: ${p => p.theme.radii.base};
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgba(17, 17, 17, 0.2);
  transform: translate(-50%, -50%);

  ${styledWidth};
`;

const AnimatedModalContent = animated(ModalContent);

export type ModalWrapperProps = WidthProps & {
  onCancel: () => void;
  content?: ReactNode;
  clickOutsite?: boolean;
  [key: string]: any;
};

const ModalWrapper: FunctionComponent<ModalWrapperProps> = ({
  width = 416,
  style,
  onCancel,
  content = '',
  clickOutsite = true,
  ...otherProps
}) => (
  <>
    <AnimatedModalOverlay
      style={style}
      onClick={() => {
        if (clickOutsite) {
          onCancel();
        }
      }}
    />
    <AnimatedModalContent width={width} style={style} {...otherProps}>
      {content}
    </AnimatedModalContent>
  </>
);

export type BaseModalProps = WidthProps & {
  onCancel: () => void;
  clickOutsite?: boolean;
  visible: boolean;
};

const BaseModal: FunctionComponent<BaseModalProps> = ({
  children,
  visible,
  onCancel,
  ...otherProps
}) => {
  useKeydown({
    keyCode: ESC_KEY_CODE,
    onKeydown: visible ? onCancel : undefined,
  });

  return (
    <Transition
      native
      items={visible ? 'visible' : 'hidden'}
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
    >
      {v =>
        v === 'visible' // FIXME: waiting for the typing update
          ? (style: any) => (
              <ModalWrapper
                style={style}
                onCancel={onCancel}
                content={children}
                {...otherProps}
              />
            )
          : () => null
      }
    </Transition>
  );
};

export default BaseModal;
