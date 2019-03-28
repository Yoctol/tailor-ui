import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  RefObject,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useRef,
  useState,
} from 'react';
import { animated } from 'react-spring';
import { mergeEventProps } from '@tailor-ui/utils';

import {
  Heading,
  Position,
  Positioner,
  Positions,
  useClickOutside,
  useKeydown,
} from 'tailor-ui';

import { PopoverContent, PopoverHeader, StyledPopover } from './styles';

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
          <PopoverContent>
            {content instanceof Function ? content(handleClose) : content}
          </PopoverContent>
        </StyledPopover>
      </animated.div>
    );
  })
);

export interface PopoverProps {
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
  title?: ReactNode | ((handleClose: () => void) => ReactNode);
  /**
   * A string or react component inside this popover.
   * If you are using click to trigger, it can be a
   * function that with `hide` callback as first argument
   */
  content: ReactNode | ((handleClose: () => void) => ReactNode);
}

const Popover: FunctionComponent<PopoverProps> = ({
  children,
  position = Position.TOP,
  title,
  content,
  defaultVisible = false,
  visible: visibleFromProps,
  onVisibleChange,
}) => {
  const childrenRef = useRef(null);
  const popupRef = useRef(null);
  const [visibleFromSelf, setVisibleFromSelf] = useState(defaultVisible);

  const hasVisibleFromProps = typeof visibleFromProps !== 'undefined';

  const visible = hasVisibleFromProps ? visibleFromProps : visibleFromSelf;

  const handleOpen = () => {
    if (onVisibleChange) {
      onVisibleChange(true);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(true);
    }
  };

  const handleClose = () => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(false);
    }
  };

  const toggle = () => {
    if (visible) {
      handleClose();
    } else {
      handleOpen();
    }
  };

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

  const renderChildren = ({ ref }: { ref: RefObject<HTMLElement> }) => {
    if (children instanceof Function) {
      return children({
        ref,
        bind: (props: any) =>
          mergeEventProps(props, {
            onClick: toggle,
          }),
      });
    }

    if (!isValidElement<any>(children)) {
      return children;
    }

    return cloneElement(children, {
      ref,
      ...mergeEventProps(children.props, {
        onClick: toggle,
      }),
    });
  };

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
        />
      )}
    >
      {renderChildren}
    </Positioner>
  );
};

export default Popover;
