import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { WidthProps, width as styledWidth } from 'styled-system';
import { animated, config, useTransition } from 'react-spring';

import Backdrop from '../Backdrop';
import tag from '../utils/CleanTag';
import useKeydown, { ESC_KEY_CODE } from '../utils/useKeydown';

const ModalContent = styled(tag.div)<WidthProps>`
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

export type BaseModalProps = WidthProps & {
  onCancel: () => void;
  clickOutsite?: boolean;
  visible: boolean;
};

const BaseModal: FunctionComponent<BaseModalProps> = ({
  children = '',
  visible,
  onCancel,
  clickOutsite = true,
  width = 416,
  ...otherProps
}) => {
  useKeydown({
    listening: visible,
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
    },
    config: config.stiff,
  });

  return (
    <>
      <Backdrop
        visible={visible}
        onClick={() => {
          if (clickOutsite) {
            onCancel();
          }
        }}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedModalContent
              key={key}
              width={width}
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
