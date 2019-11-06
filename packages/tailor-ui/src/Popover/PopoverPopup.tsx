import React, {
  CSSProperties,
  ComponentType,
  ReactNode,
  forwardRef,
  memo,
} from 'react';
import { animated } from 'react-spring';

import { Heading } from '../Typography';

import { PopoverHeader, StyledPopover } from './styles';

interface PopoverPopup {
  style: CSSProperties;
  Wrapper?: ComponentType;
  title: ReactNode | ((handleClose: () => void) => ReactNode);
  content: ReactNode | ((handleClose: () => void) => ReactNode);
  handleClose: () => void;
}

const PopoverPopup = memo(
  forwardRef<HTMLDivElement, PopoverPopup>(function PopoverPopup(
    {
      style,
      title,
      content,
      handleClose,
      Wrapper = StyledPopover,
      ...otherProps
    },
    ref
  ) {
    return (
      <animated.div style={style} ref={ref}>
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
      </animated.div>
    );
  })
);

export default PopoverPopup;
