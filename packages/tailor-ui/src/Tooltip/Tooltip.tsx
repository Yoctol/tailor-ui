import React, { FunctionComponent, ReactNode, useRef } from 'react';

import {
  useHoverTrigger,
  useRenderChildren,
  useTargetRef,
} from '@tailor-ui/hooks';

import { Position, Positions } from '../constants';
import { Positioner } from '../Positioner';

import TooltipPopup from './TooltipPopup';
import { StyledTooltipProps } from './styles';

export type TooltipProps = StyledTooltipProps & {
  Wrapper?: FunctionComponent;
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
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
};

const Tooltip: FunctionComponent<TooltipProps> = ({
  children,
  Wrapper,
  position = Position.TOP,
  content,
  defaultVisible = false,
  visible: visibleFromProps,
  onVisibleChange,
  mouseEnterDelay = 0,
  mouseLeaveDelay = 200,
  onOpenComplete,
  onCloseComplete,
  ...otherProps
}) => {
  const targetRef = useTargetRef({
    children,
  });
  const popupRef = useRef(null);

  const { visible, handleOpen, handleClose } = useHoverTrigger({
    visible: visibleFromProps,
    defaultVisible,
    onVisibleChange,
    mouseEnterDelay,
    mouseLeaveDelay,
  });

  const renderChildren = useRenderChildren({
    targetRef,
    children,
    mergeProps: {
      onMouseEnter: handleOpen,
      onMouseLeave: handleClose,
    },
  });

  return (
    <Positioner
      positionerRef={popupRef}
      targetRef={targetRef}
      visible={visible}
      onOpenComplete={onOpenComplete}
      onCloseComplete={onCloseComplete}
      position={position}
      positioner={({ style }) => (
        <TooltipPopup
          ref={popupRef}
          style={style}
          Wrapper={Wrapper}
          content={content}
          handleOpen={handleOpen}
          handleClose={handleClose}
          {...otherProps}
        />
      )}
    >
      {renderChildren}
    </Positioner>
  );
};

export { Tooltip };