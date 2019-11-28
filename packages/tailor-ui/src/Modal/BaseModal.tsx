import React, {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
} from 'react';
import styled from 'styled-components';
import {
  animated,
  config,
  useChain,
  useSpring,
  useTransition,
} from 'react-spring';

import { ESC_KEY_CODE, useKeydown } from '@tailor-ui/hooks';

import { Backdrop } from '../Backdrop';
import { Portal } from '../Portal';
import { Stack } from '../Stack';
import { StackingOrder } from '../constants';
import { StatusType } from '../types';

type Size = 'md' | 'lg';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
`;

const AnimatedModalWrapper = animated(ModalWrapper);

const ModalStatusBar = styled.div<{ statusBar: StatusType | null }>`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 48px;
  border-radius: ${p => p.theme.radii.xl};
  background-color: ${p => {
    switch (p.statusBar) {
      case 'info':
        return p.theme.colors.primary;
      case 'success':
        return p.theme.colors.success;
      case 'warning':
        return p.theme.colors.warning;
      case 'error':
        return p.theme.colors.danger;
      default:
        return '';
    }
  }};
`;

const AnimatedModalStatusBar = animated(ModalStatusBar);

const ModalContent = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: column;
  width: ${p => ({ md: 516, lg: 786 }[p.size as Size] || 516)}px;
  max-width: 90vw;
  min-height: 220px;
  max-height: 75vh;
  padding: 24px ${p => p.theme.space[3]} ${p => p.theme.space[3]};
  border-radius: ${p => p.theme.radii.xl};
  background-color: #fff;
`;

export interface BaseModalProps {
  onCancel: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  size?: Size;
  closable?: boolean;
  statusBar?: StatusType | null;
  visible: boolean;
}

const BaseModal: FC<BaseModalProps> = ({
  children = '',
  visible,
  onCancel,
  onOpenComplete,
  onCloseComplete,
  closable = true,
  size = 'md',
  statusBar = null,
  ...otherProps
}) => {
  const transRef = useRef(null);
  const springRef = useRef(null);

  useKeydown({
    listening: closable ? visible : false,
    keyCode: ESC_KEY_CODE,
    onKeydown: onCancel as any,
  });

  const transitions = useTransition(visible, null, {
    ref: transRef,
    from: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.9)',
      pointerEvents: 'auto',
    },
    enter: {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
      pointerEvents: 'auto',
    },
    leave: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.9)',
      pointerEvents: 'none',
    },
    onDestroyed: isDestroyed => {
      if (isDestroyed && onCloseComplete && !visible) {
        onCloseComplete();
      } else if (!isDestroyed && onOpenComplete && visible) {
        onOpenComplete();
      }
    },
    config: config.stiff,
  });

  const statusProps = useSpring({
    ref: springRef,
    opacity: visible ? 1 : 0,
    top: visible ? -10 : 0,
  });

  useChain(visible ? [transRef, springRef] : [springRef, transRef], [
    0,
    visible ? 0.15 : 0,
  ]);

  return (
    <Stack defaultOrder={StackingOrder.OVERLAY}>
      {stackingOrder => (
        <>
          <Backdrop
            visible={visible}
            onClick={event => {
              if (closable) {
                onCancel(event as any);
              }
            }}
          />
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <Portal key={key} zIndex={stackingOrder}>
                  <AnimatedModalWrapper style={props}>
                    {statusBar && (
                      <AnimatedModalStatusBar
                        statusBar={statusBar}
                        style={statusProps}
                      />
                    )}
                    <ModalContent size={size} {...otherProps}>
                      {children}
                    </ModalContent>
                  </AnimatedModalWrapper>
                </Portal>
              )
          )}
        </>
      )}
    </Stack>
  );
};

export default BaseModal;
