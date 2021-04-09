import { ReactNode, useContext } from 'react';

import { HooksMessageContext } from './HooksMessageProvider';

const useMessage = () => {
  const triggerRef = useContext(HooksMessageContext);

  return {
    info: (content: ReactNode, duration = 3000) =>
      triggerRef.current({ content, duration }, 'info'),
    success: (content: ReactNode, duration = 3000) =>
      triggerRef.current({ content, duration }, 'success'),
    warning: (content: ReactNode, duration = 3000) =>
      triggerRef.current({ content, duration }, 'warning'),
    error: (content: ReactNode, duration = 3000) =>
      triggerRef.current({ content, duration }, 'error'),
  };
};

export { useMessage };
