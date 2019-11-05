import React, { FC, MutableRefObject, createContext, useRef } from 'react';

import { tuplify } from '@tailor-ui/utils';

import HooksModal, { Trigger } from './HooksModal';

const defaultTrigger = tuplify(Promise.resolve(false), () => {}, () => {});

(defaultTrigger as any).confirmation = Promise.resolve(false);
(defaultTrigger as any).close = () => {};
(defaultTrigger as any).update = () => {};

const HooksModalContext = createContext<MutableRefObject<Trigger>>({
  current: () => defaultTrigger as any,
});

const HooksModalProvider: FC = ({ children }) => {
  const modalTriggerRef = useRef<Trigger>(() => defaultTrigger as any);

  return (
    <HooksModalContext.Provider value={modalTriggerRef}>
      {children}
      <HooksModal triggerRef={modalTriggerRef} />
    </HooksModalContext.Provider>
  );
};

export { HooksModalContext, HooksModalProvider };
