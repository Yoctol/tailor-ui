import React, { FC, ReactNode, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { animated, config, useTransition } from 'react-spring';

import {
  ESC_KEY_CODE,
  useKeydown,
  usePreventBodyScroll,
} from '@tailor-ui/hooks';

import { Backdrop } from '../Backdrop';
import { FooterWrapper, ModalContent, ModalHeader } from '../Modal';
import { Portal } from '../Portal';
import { StackingOrder } from '../constants';

type Placement = 'top' | 'right' | 'bottom' | 'left';

interface DrawerWrapperProps {
  breadth: string;
  placement: Placement;
}

const DrawerWrapper = styled.div<DrawerWrapperProps>`
  display: flex;
  position: absolute;
  z-index: 10000;
  flex-direction: column;
  padding: ${p => p.theme.space[3]};
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

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  placement?: Placement;
  closable?: boolean;
  maskClosable?: boolean;
  width?: string | number;
  height?: string | number;
}

const Drawer: FC<DrawerProps> = ({
  visible,
  title,
  footer,
  placement = 'right' as Placement,
  width = 400,
  height = 300,
  closable = true,
  maskClosable = true,
  onClose,
  children,
  ...otherProps
}) => {
  const breadth = useMemo(
    () => getWrapperBreadth({ placement, width, height }),
    [height, placement, width]
  );
  const transformAxis = useMemo(() => getTransformAxis(placement), [placement]);
  const transformBreadth = useMemo(
    () => getTransformBreadth({ placement, breadth }),
    [breadth, placement]
  );

  usePreventBodyScroll(visible);

  const transition = useTransition(visible, null, {
    from: {
      offset: transformBreadth,
    },
    enter: {
      offset: '0px',
    },
    leave: {
      offset: transformBreadth,
    },
    config: {
      ...config.default,
      precision: 0.1,
    },
  });

  useKeydown({
    listening: visible,
    keyCode: ESC_KEY_CODE,
    onKeydown: onClose,
  });

  return (
    <>
      <Backdrop visible={visible} onClick={() => maskClosable && onClose()} />
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <Portal key={key} defaultOrder={StackingOrder.OVERLAY}>
              <animated.div
                style={{
                  transform:
                    props.offset &&
                    props.offset.interpolate(
                      offset => `${transformAxis}(${offset})`
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
            </Portal>
          )
      )}
    </>
  );
};

export { Drawer };
