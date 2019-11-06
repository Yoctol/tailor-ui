import React, {
  ComponentType,
  FC,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

import {
  useClickOutside,
  useKeydown,
  useRenderChildren,
  useTargetRef,
  useToggleTrigger,
} from '@tailor-ui/hooks';

import { Position, Positions } from '../constants';
import { Positioner } from '../Positioner';

import PopoverPopup from './PopoverPopup';
import { StyledPopoverProps } from './styles';

export type PopoverProps = StyledPopoverProps & {
  Wrapper?: ComponentType;
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
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
};

const ClickOutsideContext = createContext<{
  setHasChild: (hasChild: boolean) => void;
}>({
  setHasChild: () => {},
});

const Popover: FC<PopoverProps> = ({
  children,
  position = Position.TOP,
  title,
  content,
  defaultVisible = false,
  visible: visibleFromProps,
  onVisibleChange,
  onOpenComplete,
  onCloseComplete,
  Wrapper,
  ...otherProps
}) => {
  const targetRef = useTargetRef({
    children,
  });
  const popupRef = useRef(null);

  const { setHasChild: setHasChildFromContext } = useContext(
    ClickOutsideContext
  );
  const [hasChild, setHasChild] = useState(false);

  const { visible, handleClose, toggle } = useToggleTrigger({
    visible: visibleFromProps,
    defaultVisible,
    onVisibleChange: newVisible => {
      setHasChildFromContext(newVisible);
      if (onVisibleChange) {
        onVisibleChange(newVisible);
      }
    },
  });

  useClickOutside({
    listening: hasChild ? false : visible,
    refs: [targetRef, popupRef],
    onClickOutside: handleClose,
  });

  useKeydown({
    listening: visible,
    keyCode: 27,
    onKeydown: handleClose,
  });

  const renderChildren = useRenderChildren({
    targetRef,
    children,
    mergeProps: {
      onClick: toggle,
    },
  });

  return (
    <ClickOutsideContext.Provider value={{ setHasChild }}>
      <Positioner
        positionerRef={popupRef}
        targetRef={targetRef}
        visible={visible}
        onOpenComplete={onOpenComplete}
        onCloseComplete={onCloseComplete}
        position={position}
        positioner={({ style }) => (
          <PopoverPopup
            ref={popupRef}
            style={style}
            title={title}
            content={content}
            handleClose={handleClose}
            Wrapper={Wrapper}
            {...otherProps}
          />
        )}
      >
        {renderChildren}
      </Positioner>
    </ClickOutsideContext.Provider>
  );
};

export { Popover };
