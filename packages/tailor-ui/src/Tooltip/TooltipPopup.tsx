import React, {
  CSSProperties,
  ComponentType,
  ReactNode,
  forwardRef,
  memo,
} from 'react';
import { animated } from 'react-spring';

import { StyledTooltip } from './styles';

interface TooltipPopup {
  style: CSSProperties;
  Wrapper?: ComponentType;
  content: ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}

const TooltipPopup = memo(
  forwardRef<HTMLDivElement, TooltipPopup>(function TooltipPopup(
    {
      style,
      content,
      handleOpen,
      handleClose,
      Wrapper = StyledTooltip,
      ...otherProps
    },
    ref
  ) {
    return (
      <animated.div style={style} ref={ref}>
        <Wrapper
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          {...otherProps}
        >
          {content}
        </Wrapper>
      </animated.div>
    );
  })
);

export default TooltipPopup;
