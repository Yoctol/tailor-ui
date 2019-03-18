import { useContext } from 'react';

import EffectModalContext from './EffectModalContext';
import { ModalOptions } from './EffectModal';

const useModal = () => {
  const triggerRef = useContext(EffectModalContext);

  return {
    confirm: (options: ModalOptions) => triggerRef.current(options, 'confirm'),
    info: (options: ModalOptions) => triggerRef.current(options, 'info'),
    success: (options: ModalOptions) => triggerRef.current(options, 'success'),
    warning: (options: ModalOptions) => triggerRef.current(options, 'warning'),
    error: (options: ModalOptions) => triggerRef.current(options, 'error'),
  };
};

export default useModal;
