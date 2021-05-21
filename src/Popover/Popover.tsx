import React, {
  ComponentType,
  FC,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

import { Position, Positions } from '../constants';
import { Positioner } from '../Positioner';
import {
  useClickOutside,
  useKeydown,
  useRenderChildren,
  useTargetRef,
  useToggleTrigger,
} from '../hooks';

import PopoverPopup from './PopoverPopup';
import { StyledPopoverProps } from './styles';

export type PopoverProps = StyledPopoverProps & {
  Wrapper?: ComponentType;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  position?: Positions;
  title?: ReactNode | ((handleClose: () => void) => ReactNode);
  content: ReactNode | ((handleClose: () => void) => ReactNode);
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
};

export const ClickOutsideContext = createContext<{
  setHasChild: (hasChild: boolean) => void;
}>({
  setHasChild: () => {},
});

ClickOutsideContext.displayName = 'ClickOutsideContext';

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
  const popupRef = useRef<HTMLDivElement>(null);
  const targetRef = useTargetRef({
    children,
  });

  const { setHasChild: setHasChildFromContext } =
    useContext(ClickOutsideContext);
  const [hasChild, setHasChild] = useState(false);

  const { visible, handleClose, toggle } = useToggleTrigger({
    visible: visibleFromProps,
    defaultVisible,
    onVisibleChange: (newVisible) => {
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
        positioner={
          <PopoverPopup
            title={title}
            content={content}
            handleClose={handleClose}
            Wrapper={Wrapper}
            {...otherProps}
          />
        }
      >
        {renderChildren}
      </Positioner>
    </ClickOutsideContext.Provider>
  );
};

export { Popover };
