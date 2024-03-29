import React, { FC, ReactNode, useMemo } from 'react';
import { animated, to, useTransition } from '@react-spring/web';

import CloseButton from '../Modal/CloseButton';
import { Backdrop } from '../Backdrop';
import { ESC_KEY_CODE, useKeydown, usePreventBodyScroll } from '../hooks';
import { Flex } from '../Layout';
import { Heading } from '../Typography';
import { Portal } from '../Portal';
import { StackingOrder } from '../constants';

import { DrawerWrapper } from './styles';
import { Placement } from './types';

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

  const transition = useTransition(visible, {
    from: {
      offset: transformBreadth,
    },
    enter: {
      offset: '0px',
    },
    leave: {
      offset: transformBreadth,
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
      {transition(
        (style, item) =>
          item && (
            <Portal defaultOrder={StackingOrder.OVERLAY}>
              <animated.div
                style={{
                  transform: to(
                    style.offset,
                    (offset) => `${transformAxis}(${offset})`
                  ),
                }}
              >
                <DrawerWrapper
                  placement={placement}
                  breadth={breadth}
                  {...otherProps}
                >
                  {title && (
                    <Flex flex="none" alignItems="center" p="4">
                      <Flex flex="auto">
                        <Heading.H3>{title}</Heading.H3>
                      </Flex>
                      {closable && <CloseButton onCancel={onClose} />}
                    </Flex>
                  )}
                  <Flex flex="auto" flexDirection="column" overflowY="auto">
                    {children}
                  </Flex>
                  {footer && (
                    <Flex justifyContent="flex-end" bg="surface" px="4" py="3">
                      {footer}
                    </Flex>
                  )}
                </DrawerWrapper>
              </animated.div>
            </Portal>
          )
      )}
    </>
  );
};

export { Drawer };
