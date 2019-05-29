import { useCallback, useEffect, useState } from 'react';

const useToggleTrigger = ({
  visible: visibleFromProps,
  defaultVisible,
  onVisibleChange,
}: {
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}) => {
  const [visibleFromSelf, setVisibleFromSelf] = useState(
    defaultVisible || visibleFromProps || false
  );

  const hasVisibleFromProps = typeof visibleFromProps !== 'undefined';

  const visible = hasVisibleFromProps ? visibleFromProps : visibleFromSelf;

  useEffect(() => {
    if (
      hasVisibleFromProps &&
      onVisibleChange &&
      visibleFromProps !== visibleFromSelf
    ) {
      setVisibleFromSelf(visibleFromProps as boolean);
      onVisibleChange(visibleFromProps as boolean);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVisibleFromProps, onVisibleChange, visibleFromProps]);

  const handleOpen = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(true);
    }

    setVisibleFromSelf(true);
  }, [onVisibleChange]);

  const handleClose = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }

    setVisibleFromSelf(false);
  }, [onVisibleChange]);

  const toggle = useCallback(() => {
    if (visible) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [visible, handleClose, handleOpen]);

  return {
    visible,
    handleOpen,
    handleClose,
    toggle,
  };
};

export default useToggleTrigger;
