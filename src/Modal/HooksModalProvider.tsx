import React, {
  FC,
  MutableRefObject,
  createContext,
  useCallback,
  useRef,
} from 'react';

import { tuplify } from '../utils';

import HooksModal, { Trigger } from './HooksModal';

const defaultTrigger = tuplify(
  Promise.resolve(false),
  () => {},
  () => {}
);

(defaultTrigger as any).confirmation = Promise.resolve(false);
(defaultTrigger as any).close = () => {};
(defaultTrigger as any).update = () => {};

const HooksModalContext = createContext<MutableRefObject<Trigger>>({
  current: () => defaultTrigger as any,
});

HooksModalContext.displayName = 'HooksModalContext';

const HooksModalProvider: FC = ({ children }) => {
  const modalTriggerRef = useRef<Trigger>(() => defaultTrigger as any);

  const setTrigger = useCallback((trigger: Trigger) => {
    modalTriggerRef.current = trigger;
  }, []);

  return (
    <HooksModalContext.Provider value={modalTriggerRef}>
      {children}
      <HooksModal setTrigger={setTrigger} />
    </HooksModalContext.Provider>
  );
};

export { HooksModalContext, HooksModalProvider };
