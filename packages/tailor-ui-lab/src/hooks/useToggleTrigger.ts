import { useCallback, useState } from 'react';

const useToggleTrigger = ({
  visible: visibleFromProps,
  defaultVisible,
  onVisibleChange,
}: {
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}) => {
  const [visibleFromSelf, setVisibleFromSelf] = useState(defaultVisible);

  const hasVisibleFromProps = typeof visibleFromProps !== 'undefined';

  const visible = hasVisibleFromProps ? visibleFromProps : visibleFromSelf;

  const handleOpen = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(true);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(true);
    }
  }, [hasVisibleFromProps, onVisibleChange]);

  const handleClose = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(false);
    }
  }, [hasVisibleFromProps, onVisibleChange]);

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
