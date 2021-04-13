import { ReactNode, useCallback, useContext } from 'react';

import { HooksNotificationContext } from './HooksNotificationProvider';

const useNotification = () => {
  const triggerRef = useContext(HooksNotificationContext);

  const open = useCallback(
    ({
      key,
      icon,
      content,
      duration = Infinity,
    }: {
      key?: string;
      icon?: ReactNode;
      content: ReactNode;
      duration?: number;
    }) => triggerRef.current.open({ key, icon, content, duration }),
    [triggerRef]
  );

  const close = useCallback((key: string) => triggerRef.current.close(key), [
    triggerRef,
  ]);

  const destroy = useCallback(() => triggerRef.current.destroy(), [triggerRef]);

  return {
    open,
    close,
    destroy,
  };
};

export { useNotification };
