import { useContext } from 'react';

import { HooksModalContext } from './HooksModalProvider';
import { ModalOptions } from './HooksModal';

const useModal = () => {
  const triggerRef = useContext(HooksModalContext);

  return {
    confirm: (options: ModalOptions) => triggerRef.current(options, 'confirm'),
    info: (options: ModalOptions) => triggerRef.current(options, 'info'),
    success: (options: ModalOptions) => triggerRef.current(options, 'success'),
    warning: (options: ModalOptions) => triggerRef.current(options, 'warning'),
    error: (options: ModalOptions) => triggerRef.current(options, 'error'),
  };
};

export { useModal };
