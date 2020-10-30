import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { animated, config, useTransition } from 'react-spring';

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

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  zIndex?: number;
}

const Backdrop: FC<BackdropProps> = ({
  visible,
  zIndex = StackingOrder.OVERLAY,
  ...otherProps
}) => {
  const transition = useTransition(visible, null, {
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
    // FIXME: react type
    <>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <Portal key={key} defaultOrder={zIndex}>
              <AnimatedStyledBackdrop style={props} {...otherProps} />
            </Portal>
          )
      )}
    </>
  );
};

export { Backdrop };
