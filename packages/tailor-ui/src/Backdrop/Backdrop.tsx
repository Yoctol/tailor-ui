import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { animated, config, useTransition } from 'react-spring';

const StyledBackdrop = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AnimatedStyledBackdrop = animated(StyledBackdrop);

export interface BackdropProps {
  visible: boolean;
  [key: string]: any;
}

const Backdrop: FunctionComponent<BackdropProps> = ({
  visible,
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
            <AnimatedStyledBackdrop key={key} style={props} {...otherProps} />
          )
      )}
    </>
  );
};

export default Backdrop;