import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';

const useHoverTrigger = ({
  visible: visibleFromProps,
  defaultVisible,
  onVisibleChange,
  mouseEnterDelay,
  mouseLeaveDelay,
}: {
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  mouseEnterDelay: number;
  mouseLeaveDelay: number;
}) => {
  const cancelEnterDebounce = useRef<null | (() => void)>();
  const cancelLeaveDebounce = useRef<null | (() => void)>();
  const [visibleFromSelf, setVisibleFromSelf] = useState(defaultVisible);

  const hasVisibleFromProps = typeof visibleFromProps !== 'undefined';

  const visible = hasVisibleFromProps ? visibleFromProps : visibleFromSelf;

  const open = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(true);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(true);
    }
  }, [hasVisibleFromProps, onVisibleChange]);

  const close = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }

    if (!hasVisibleFromProps) {
      setVisibleFromSelf(false);
    }
  }, [hasVisibleFromProps, onVisibleChange]);

  const handleOpen = useCallback(() => {
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
  }, [mouseEnterDelay, open]);

  const handleClose = useCallback(() => {
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
  }, [close, mouseLeaveDelay]);

  return {
    handleOpen,
    handleClose,
    visible,
  };
};

export { useHoverTrigger };
