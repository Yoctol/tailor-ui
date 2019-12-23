import React, { ComponentType, ReactNode, memo } from 'react';

import { StyledTooltip } from './styles';

interface TooltipPopup {
  Wrapper?: ComponentType;
  content: ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}

const TooltipPopup = memo<TooltipPopup>(function TooltipPopup({
  content,
  handleOpen,
  handleClose,
  Wrapper = StyledTooltip,
  ...otherProps
}) {
  return (
    <Wrapper
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      {...otherProps}
    >
      {content}
    </Wrapper>
  );
});

export default TooltipPopup;
