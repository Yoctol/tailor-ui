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
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  position?: Positions;
  title?: ReactNode | ((handleClose: () => void) => ReactNode);
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
