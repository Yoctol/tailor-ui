import React, { FunctionComponent } from 'react';
import { Transition, animated, config } from 'react-spring';

import styled from 'utils/styled-components';

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

export interface IBackdropProps {
  visible: boolean;
  [key: string]: any;
}

const Backdrop: FunctionComponent<IBackdropProps> = ({ visible, ...props }) => (
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
      pointerEvents: 'none',
    }}
    config={config.stiff}
  >
    {_visible =>
      _visible &&
      (styles => <AnimatedStyledBackdrop style={styles} {...props} />)
    }
  </Transition>
);

export default Backdrop;
