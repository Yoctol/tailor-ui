import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  forwardRef,
  memo,
  useRef,
} from 'react';
import { animated } from 'react-spring';

import {
  Heading,
  Position,
  Positioner,
  Positions,
  useClickOutside,
  useKeydown,
} from 'tailor-ui';

import useRenderChildren from '../hooks/useRenderChildren';
import useToggleTrigger from '../hooks/useToggleTrigger';

import { PopoverHeader, StyledPopover, StyledPopoverProps } from './styles';

interface PopoverPopup {
  style: CSSProperties;
  title: ReactNode | ((handleClose: () => void) => ReactNode);
  content: ReactNode | ((handleClose: () => void) => ReactNode);
  handleClose: () => void;
}

const PopoverPopup = memo(
  forwardRef<HTMLDivElement, PopoverPopup>(function PopoverPopup(
    { style, title, content, handleClose, ...otherProps },
    ref
  ) {
    return (
      <animated.div style={style} ref={ref}>
        <StyledPopover {...otherProps}>
          {title && (
            <PopoverHeader>
              <Heading.h6>
                {title instanceof Function ? title(handleClose) : title}
              </Heading.h6>
            </PopoverHeader>
          )}
          {content instanceof Function ? content(handleClose) : content}
        </StyledPopover>
      </animated.div>
    );
  })
);

export type PopoverProps = StyledPopoverProps & {
  /**
   * Whether the floating popover card is visible by default. Only support when the trigger is `click`
   */
  defaultVisible?: boolean;
  /**
   * Whether the floating popover card is visible. Only support when the trigger is `click`
   */
  visible?: boolean;
  /**
   * 	Callback executed when visibility of the popover card is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * The position base on the children component
   */
  position?: Positions;
  /**
   * A string or react component inside this popover.
   * If you are using click to trigger, it can be a
   * function that with `hide` callback as first argument
   */
  title?: ReactNode | ((handleClose: () => void) => ReactNode);
  /**
   * A string or react component inside this popover.
   * If you are using click to trigger, it can be a
   * function that with `hide` callback as first argument
   */
  content: ReactNode | ((handleClose: () => void) => ReactNode);
};

const Popover: FunctionComponent<PopoverProps> = ({
  children,
  position = Position.TOP,
  title,
  content,
  defaultVisible = false,
  visible: visibleFromProps,
  onVisibleChange,
  ...otherProps
}) => {
  const childrenRefFromSelf = useRef(null);
  const popupRef = useRef(null);

  const { visible, handleClose, toggle } = useToggleTrigger({
    visible: visibleFromProps,
    defaultVisible,
    onVisibleChange,
  });

  const childrenRef =
    children && (children as any).ref
      ? (children as any).ref
      : childrenRefFromSelf;

  useClickOutside({
    listening: visible,
    refs: [childrenRef, popupRef],
    onClickOutside: handleClose,
  });

  useKeydown({
    listening: visible,
    keyCode: 27,
    onKeydown: handleClose,
  });

  const renderChildren = useRenderChildren({
    ref: childrenRef,
    children,
    mergeProps: {
      onClick: toggle,
    },
  });

  return (
    <Positioner
      positionerRef={popupRef}
      targetRef={childrenRef}
      visible={visible}
      position={position}
      positioner={({ style }) => (
        <PopoverPopup
          ref={popupRef}
          style={style}
          title={title}
          content={content}
          handleClose={handleClose}
          {...otherProps}
        />
      )}
    >
      {renderChildren}
    </Positioner>
  );
};

export default Popover;
