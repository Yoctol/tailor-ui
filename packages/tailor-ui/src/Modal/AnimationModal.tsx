import React, {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
} from 'react';
import { config, useChain, useSpring, useTransition } from 'react-spring';

import { ESC_KEY_CODE, useKeydown } from '@tailor-ui/hooks';

import { Backdrop } from '../Backdrop';
import { Portal } from '../Portal';
import { StackingOrder } from '../constants';
import { StatusType } from '../types';

import { ModalContent, ModalStatusBar, ModalWrapper } from './styles';
import { ModalSize } from './types';

export interface AnimationModalProps {
  onCancel: MouseEventHandler | KeyboardEventHandler;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  size?: ModalSize;
  closable?: boolean;
  status?: StatusType | null;
  visible: boolean;
}

const AnimationModal: FC<AnimationModalProps> = ({
  children = '',
  visible,
  onCancel,
  onOpenComplete,
  onCloseComplete,
  closable = true,
  size = 'md',
  status = null,
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
            <Portal key={key} defaultOrder={StackingOrder.OVERLAY}>
              <ModalWrapper style={props}>
                {status && (
                  <ModalStatusBar status={status} style={statusProps} />
                )}
                <ModalContent size={size} {...otherProps}>
                  {children}
                </ModalContent>
              </ModalWrapper>
            </Portal>
          )
      )}
    </>
  );
};

export default AnimationModal;
