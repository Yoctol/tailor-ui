import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { animated, config, useTransition } from 'react-spring';

import Backdrop from '../Backdrop';
import tag from '../utils/CleanTag';
import useKeydown, { ESC_KEY_CODE } from '../utils/useKeydown';

type Size = 'md' | 'lg';

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 10001;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AnimatedModalWrapper = animated(ModalWrapper);

const ModalContent = styled(tag.div)<{ type: Size }>`
  display: flex;
  flex-direction: column;
  width: ${p => ({ md: 516, lg: 786 }[p.size as Size] || 516)}px;
  min-height: 220px;
  max-height: 75vh;
  padding: 24px ${p => p.theme.space[3]} ${p => p.theme.space[3]};
  border-radius: ${p => p.theme.radii.xl};
  background-color: #fff;
`;

export interface BaseModalProps {
  onCancel: () => void;
  size?: Size;
  cancelable?: boolean;
  visible: boolean;
}

const BaseModal: FunctionComponent<BaseModalProps> = ({
  children = '',
  visible,
  onCancel,
  cancelable = true,
  size = 'md',
  ...otherProps
}) => {
  useKeydown({
    listening: cancelable ? visible : false,
    keyCode: ESC_KEY_CODE,
    onKeydown: onCancel,
  });

  const transitions = useTransition(visible, null, {
    unique: true,
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.9)',
      pointerEvents: 'none',
    },
    config: config.stiff,
  });

  return (
    <>
      <Backdrop
        visible={visible}
        onClick={() => {
          if (cancelable) {
            onCancel();
          }
        }}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedModalWrapper key={key} style={props}>
              <ModalContent size={size} {...otherProps}>
                {children}
              </ModalContent>
            </AnimatedModalWrapper>
          )
      )}
    </>
  );
};

export default BaseModal;
