import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated, config } from 'react-spring';
import { WidthProps, width as styledWidth } from 'styled-system';

import tag from 'utils/CleanTag';
import useKeydown, { ESC_KEY_CODE } from 'utils/useKeydown';

import Backdrop from '../Backdrop';

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
      <Transition
        native
        items={visible}
        from={{
          opacity: 0,
        }}
        enter={{
          opacity: 1,
        }}
        leave={{
          opacity: 0,
        }}
        config={config.stiff}
      >
        {_visible =>
          _visible &&
          (style => (
            <AnimatedModalContent width={width} style={style} {...otherProps}>
              {children}
            </AnimatedModalContent>
          ))
        }
      </Transition>
    </>
  );
};

export default BaseModal;
