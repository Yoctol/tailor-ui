import React, { ComponentPropsWithoutRef, FC } from 'react';
import styled from 'styled-components';
import { animated, config, useTransition } from '@react-spring/web';

import { Portal } from '../Portal';
import { StackingOrder } from '../constants';

const StyledBackdrop = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

const AnimatedStyledBackdrop = animated(StyledBackdrop);

export interface BackdropProps extends ComponentPropsWithoutRef<'div'> {
  visible: boolean;
  zIndex?: number;
}

const Backdrop: FC<BackdropProps> = ({
  visible,
  zIndex = StackingOrder.OVERLAY,
  ...otherProps
}) => {
  const transition = useTransition(visible, {
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

  return transition(
    (style, item) =>
      item && (
        <Portal defaultOrder={zIndex}>
          <AnimatedStyledBackdrop style={style} {...otherProps} />
        </Portal>
      )
  );
};

export { Backdrop };
