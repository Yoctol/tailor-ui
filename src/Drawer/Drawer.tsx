import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import { Transition, animated, config } from 'react-spring';

import Portal from 'utils/Portal';
import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';
import useKeydown, { ESC_KEY_CODE } from 'utils/useKeydown';

import Backdrop from '../Backdrop';
import { FooterWrapper, ModalContent, ModalHeader } from '../Modal';

type Placement = 'top' | 'right' | 'bottom' | 'left';

interface IDrawerWrapperProps {
  breadth: string;
  placement: Placement;
}

const DrawerWrapper = styled<IDrawerWrapperProps, 'div'>(tag.div)`
  display: flex;
  position: absolute;
  z-index: 10000;
  flex-direction: column;
  background-color: #fff;

  ${p =>
    ['top', 'bottom'].includes(p.placement)
      ? css`
          top: ${p.placement === 'top' ? 0 : `calc(100vh - ${p.breadth})`};
          height: ${p.breadth};
          width: 100vw;
          box-shadow: 0 ${p.placement === 'bottom' && '-'}2px 8px
            rgba(0, 0, 0, 0.15);
        `
      : css`
          left: ${p.placement === 'left' ? 0 : `calc(100vw - ${p.breadth})`};
          width: ${p.breadth};
          height: 100vh;
          box-shadow: ${p.placement === 'right' && '-'}2px 0 8px
            rgba(0, 0, 0, 0.15);
        `}
`;

const formatBreadth = (breadth: number | string) =>
  typeof breadth === 'number' ? `${breadth}px` : breadth;

const getTransformAxis = (placement: Placement) => {
  if (['top', 'bottom'].includes(placement)) {
    return 'translateY';
  }

  return 'translateX';
};

const getTransformBreadth = ({
  placement,
  breadth,
}: {
  placement: Placement;
  breadth: string;
}) => {
  const prefix = ['left', 'top'].includes(placement) ? '-' : '';
  return `${prefix}${breadth}`;
};

const getWrapperBreadth = ({
  placement,
  width,
  height,
}: {
  placement: Placement;
  width: number | string;
  height: number | string;
}) => {
  if (['top', 'bottom'].includes(placement)) {
    return formatBreadth(height);
  }

  return formatBreadth(width);
};

export interface IDrawerProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  placement?: Placement;
  closable?: boolean;
  maskClosable?: boolean;
  width?: string | number;
  height?: string | number;
}

const Drawer: FunctionComponent<IDrawerProps> = ({
  visible,
  title,
  footer,
  placement = 'right',
  width = 400,
  height = 300,
  closable = true,
  maskClosable = true,
  onClose,
  children,
  ...otherProps
}) => {
  const breadth = getWrapperBreadth({ placement, width, height });
  const transformAxis = getTransformAxis(placement);
  const transformBreadth = getTransformBreadth({ placement, breadth });

  useKeydown({
    listening: visible,
    keyCode: ESC_KEY_CODE,
    onKeydown: onClose,
  });

  useEffect(
    () => {
      document.body.style.overflow = visible ? 'hidden' : '';

      return () => {
        document.body.style.overflow = '';
      };
    },
    [visible]
  );

  return (
    <Portal appendFor="drawer">
      <Transition
        native
        items={visible}
        from={{
          offset: transformBreadth,
        }}
        enter={{
          offset: '0px',
        }}
        leave={{
          offset: transformBreadth,
        }}
        config={{
          ...config.default,
          precision: 0.1,
        }}
      >
        {_visible =>
          _visible &&
          ((props: { offset: any }) => (
            <>
              <Backdrop
                visible={visible}
                onClick={() => {
                  if (maskClosable) {
                    onClose();
                  }
                }}
              />
              <animated.div
                style={{
                  transform: props.offset.interpolate(
                    (offset: any) => `${transformAxis}(${offset})`
                  ),
                }}
              >
                <DrawerWrapper placement={placement} breadth={breadth}>
                  {title && (
                    <ModalHeader
                      title={title}
                      onCancel={onClose}
                      closable={closable}
                    />
                  )}
                  <ModalContent {...otherProps}>{children}</ModalContent>
                  {footer && <FooterWrapper>{footer}</FooterWrapper>}
                </DrawerWrapper>
              </animated.div>
            </>
          ))
        }
      </Transition>
    </Portal>
  );
};

export default Drawer;
