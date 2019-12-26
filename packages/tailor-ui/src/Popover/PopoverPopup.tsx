import React, { ComponentType, ReactNode, memo } from 'react';

import { Heading } from '../Typography';

import { PopoverHeader, StyledPopover } from './styles';

interface PopoverPopup {
  Wrapper?: ComponentType;
  title: ReactNode | ((handleClose: () => void) => ReactNode);
  content: ReactNode | ((handleClose: () => void) => ReactNode);
  handleClose: () => void;
}

const PopoverPopup = memo<PopoverPopup>(function PopoverPopup({
  title,
  content,
  handleClose,
  Wrapper = StyledPopover,
  ...otherProps
}) {
  return (
    <Wrapper {...otherProps}>
      {title && (
        <PopoverHeader>
          <Heading.h6>
            {title instanceof Function ? title(handleClose) : title}
          </Heading.h6>
        </PopoverHeader>
      )}
      {content instanceof Function ? content(handleClose) : content}
    </Wrapper>
  );
});

export default PopoverPopup;
