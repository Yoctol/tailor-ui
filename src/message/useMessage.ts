import { useContext } from 'react';

import { HooksMessageContext } from './HooksMessageProvider';

const useMessage = () => {
  const triggerRef = useContext(HooksMessageContext);

  return {
    info: (content: string, duration = 3000) =>
      triggerRef.current({ content, duration }, 'info'),
    success: (content: string, duration = 3000) =>
      triggerRef.current({ content, duration }, 'success'),
    warning: (content: string, duration = 3000) =>
      triggerRef.current({ content, duration }, 'warning'),
    error: (content: string, duration = 3000) =>
      triggerRef.current({ content, duration }, 'error'),
  };
};

export { useMessage };