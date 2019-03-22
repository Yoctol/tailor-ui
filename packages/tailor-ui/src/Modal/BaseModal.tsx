import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { animated, config, useTransition } from 'react-spring';

import Backdrop from '../Backdrop';
import tag from '../utils/CleanTag';
import useKeydown, { ESC_KEY_CODE } from '../utils/useKeydown';

type Size = 'md' | 'lg';

const ModalContent = styled(tag.div)<{ type: Size }>`
  display: flex;
  position: fixed;
  z-index: 10001;
  top: 50%;
  left: 50%;
  flex-direction: column;
  width: ${p => ({ md: 516, lg: 786 }[p.size as Size] || 516)}px;
  min-height: 220px;
  max-height: 75vh;
  padding: 24px ${p => p.theme.space[3]} ${p => p.theme.space[3]};
  border-radius: ${p => p.theme.radii.xl};
  background-color: #fff;
  transform: translate(-50%, -50%);
`;

const AnimatedModalContent = animated(ModalContent);

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
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
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
            <AnimatedModalContent
              key={key}
              size={size}
              style={props}
              {...otherProps}
            >
              {children}
            </AnimatedModalContent>
          )
      )}
    </>
  );
};

export default BaseModal;
