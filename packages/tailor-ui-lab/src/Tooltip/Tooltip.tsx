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
import debounce from 'lodash.debounce';
import { animated } from 'react-spring';

import { Position, Positioner, Positions } from 'tailor-ui';

import { StyledTooltip, StyledTooltipProps } from './styles';

interface TooltipPopup {
  style: CSSProperties;
  content: ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}

const TooltipPopup = memo(
  forwardRef<HTMLDivElement, TooltipPopup>(function TooltipPopup(
    { style, content, handleOpen, handleClose, ...otherProps },
    ref
  ) {
    return (
      <animated.div style={style} ref={ref}>
        <StyledTooltip
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          {...otherProps}
        >
          {content}
        </StyledTooltip>
      </animated.div>
    );
  })
);

export type TooltipProps = StyledTooltipProps & {
  /**
   * Whether the floating tooltip card is visible by default. Only support when the trigger is `click`
   */
  defaultVisible?: boolean;
  /**
   * Whether the floating tooltip card is visible. Only support when the trigger is `click`
   */
  visible?: boolean;
  /**
   * 	Callback executed when visibility of the tooltip card is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * The position base on the children component
   */
  position?: Positions;
  /**
   * A string or react component inside this tooltip.
   * If you are using click to trigger, it can be a
   * function that with `hide` callback as first argument
   */
  content: ReactNode;
  /**
   * Delay in milliseconds, before tooltip is shown on mouse enter
   */
  mouseEnterDelay?: number;
  /**
   * Delay in milliseconds, before tooltip is hidden on mouse leave
   */
  mouseLeaveDelay?: number;
};

const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  position = Position.TOP,
  content,
  defaultVisible = false,
  visible: visibleFromProps,
  onVisibleChange,
  mouseEnterDelay = 0,
  mouseLeaveDelay = 200,
}) => {
  const childrenRef = useRef(null);
  const popupRef = useRef(null);
  const cancelEnterDebounce = useRef<null | (() => void)>();
  const cancelLeaveDebounce = useRef<null | (() => void)>();
  const [visibleFromSelf, setVisibleFromSelf] = useState(defaultVisible);

  const hasVisibleFromProps = typeof visibleFromProps !== 'undefined';

  const visible = hasVisibleFromProps ? visibleFromProps : visibleFromSelf;

  const open = () => {
    if (onVisibleChange) {
      onVisibleChange(true);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(true);
    }
  };

  const close = () => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(false);
    }
  };

  const handleOpen = () => {
    if (cancelLeaveDebounce.current) {
      cancelLeaveDebounce.current();
      cancelLeaveDebounce.current = null;
    }

    if (mouseEnterDelay === 0) {
      open();
    } else {
      const debounced = debounce(open, mouseEnterDelay);
      debounced();
      cancelEnterDebounce.current = debounced.cancel;
    }
  };

  const handleClose = () => {
    if (cancelEnterDebounce.current) {
      cancelEnterDebounce.current();
      cancelEnterDebounce.current = null;
    }

    if (mouseLeaveDelay === 0) {
      close();
    } else {
      const debounced = debounce(close, mouseLeaveDelay);
      debounced();
      cancelLeaveDebounce.current = debounced.cancel;
    }
  };

  // TODO: compose events
  const renderChildren = ({ ref }: { ref: RefObject<HTMLElement> }) => {
    if (children instanceof Function) {
      return children({
        ref,
        bind: {
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        },
      });
    }

    if (!isValidElement<any>(children)) {
      return children;
    }

    return cloneElement(children, {
      ref,
      onMouseEnter: handleOpen,
      onMouseLeave: handleClose,
    });
  };

  return (
    <Positioner
      positionerRef={popupRef}
      targetRef={childrenRef}
      visible={visible}
      position={position}
      positioner={({ style }) => (
        <TooltipPopup
          ref={popupRef}
          style={style}
          content={content}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
    >
      {renderChildren}
    </Positioner>
  );
};

export default Tooltip;
