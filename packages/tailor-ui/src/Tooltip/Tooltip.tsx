import React, { ComponentType, FC, ReactNode, useRef } from 'react';

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
  Wrapper?: ComponentType;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  position?: Positions;
  content: ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
};

const Tooltip: FC<TooltipProps> = ({
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
