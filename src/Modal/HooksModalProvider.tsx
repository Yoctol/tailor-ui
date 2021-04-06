import React, {
  FC,
  MutableRefObject,
  createContext,
  useCallback,
  useRef,
} from 'react';

import { tuplify } from '../utils';

import HooksModal, {
  ModalOptions,
  ModalTypes,
  Trigger,
  TriggerResponse,
} from './HooksModal';

const HooksModalContext = createContext<MutableRefObject<Trigger>>({
  current: (() => {}) as any,
});

HooksModalContext.displayName = 'HooksModalContext';

const HooksModalProvider: FC = ({ children }) => {
  const lazyInvokePromise = useRef<(confirmation: boolean) => void>();
  const lazyInvokeClose = useRef<boolean>();
  const lazyInvokeUpdateOptions = useRef<
    Omit<ModalOptions, 'onConfirm' | 'onCancel'>
  >();
  const lazyInvoke = useRef<{ options: ModalOptions; type: ModalTypes }>();
  const modalTriggerRef = useRef<Trigger>((options, type) => {
    lazyInvoke.current = { options, type };
    const promise = new Promise<boolean>((resolve) => {
      lazyInvokePromise.current = resolve;
    });
    const close = () => {
      lazyInvokeClose.current = true;
    };
    const update = (
      updateOptions: Omit<ModalOptions, 'onConfirm' | 'onCancel'>
    ) => {
      lazyInvokeUpdateOptions.current = updateOptions;
    };
    const lazyTrigger = tuplify(promise, close, update);
    (lazyTrigger as any).confirmation = promise;
    (lazyTrigger as any).close = close;
    (lazyTrigger as any).update = update;

    return (lazyTrigger as unknown) as TriggerResponse;
  });

  const setTrigger = useCallback(async (trigger: Trigger) => {
    modalTriggerRef.current = trigger;

    if (lazyInvoke.current && lazyInvokePromise.current) {
      const [confirmation, close, update] = trigger(
        lazyInvoke.current.options,
        lazyInvoke.current.type
      );
      confirmation.then((confirm) => lazyInvokePromise.current?.(confirm));

      if (lazyInvokeClose.current) {
        close();
      }
      if (lazyInvokeUpdateOptions.current) {
        update(lazyInvokeUpdateOptions.current);
      }
    }
  }, []);

  return (
    <HooksModalContext.Provider value={modalTriggerRef}>
      {children}
      <HooksModal setTrigger={setTrigger} />
    </HooksModalContext.Provider>
  );
};

export { HooksModalContext, HooksModalProvider };
