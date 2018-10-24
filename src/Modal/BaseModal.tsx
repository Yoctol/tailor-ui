import React, { PureComponent, ReactNode, SFC } from 'react';
import { Transition, animated, config } from 'react-spring';
import { WidthProps, width as styledWidth } from 'styled-system';

import Keydown from 'utils/Keydown';
import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

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

const ModalContent = styled<WidthProps & ICssProps, 'div'>(tag.div)`
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
  ${styledCss};
`;

const AnimatedModalContent = animated(ModalContent);

export type ModalWrapperProps = WidthProps & {
  onCancel: () => void;
  content?: ReactNode;
  clickOutsite?: boolean;
  [key: string]: any;
};

const ModalWrapper: SFC<ModalWrapperProps> = ({
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

class BaseModal extends PureComponent<BaseModalProps> {
  render() {
    const { children, visible, onCancel, ...otherProps } = this.props;

    return (
      <>
        {visible && (
          <Keydown keyCode={Keydown.ESC_KEY_CODE} handleKeydown={onCancel} />
        )}
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
            v === 'visible' && // FIXME: waiting for the typing update
            ((style: any) => (
              <ModalWrapper
                style={style}
                onCancel={onCancel}
                content={children}
                {...otherProps}
              />
            ))
          }
        </Transition>
      </>
    );
  }
}

export default BaseModal;
