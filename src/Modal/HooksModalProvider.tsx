import React, { FC, MutableRefObject, createContext, useRef } from 'react';

import { tuplify } from '../utils';

import HooksModal, { Trigger } from './HooksModal';

const defaultTriggerResponse = tuplify(
  Promise.resolve(false),
  () => {},
  () => {}
);
(defaultTriggerResponse as any).confirmation = Promise.resolve(false);
(defaultTriggerResponse as any).close = () => {};
(defaultTriggerResponse as any).update = () => {};

const HooksModalContext = createContext<MutableRefObject<Trigger>>({
  current: () => defaultTriggerResponse as any,
});

HooksModalContext.displayName = 'HooksModalContext';

const HooksModalProvider: FC = ({ children }) => {
  const modalTriggerRef = useRef<Trigger>(() => defaultTriggerResponse as any);

  return (
    <HooksModalContext.Provider value={modalTriggerRef}>
      {children}
      <HooksModal modalTriggerRef={modalTriggerRef} />
    </HooksModalContext.Provider>
  );
};

export { HooksModalContext, HooksModalProvider };
