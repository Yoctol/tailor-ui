import React, { FC, MutableRefObject, createContext, useRef } from 'react';

import HooksModal, { Trigger } from './HooksModal';

const HooksModalContext = createContext<MutableRefObject<Trigger>>({
  current: () => ({
    confirmation: Promise.resolve(false),
    close: () => {},
    update: () => {},
  }),
});

const HooksModalProvider: FC = ({ children }) => {
  const modalTriggerRef = useRef(() => ({
    confirmation: Promise.resolve(false),
    close: () => {},
    update: () => {},
  }));

  return (
    <HooksModalContext.Provider value={modalTriggerRef}>
      {children}
      <HooksModal triggerRef={modalTriggerRef} />
    </HooksModalContext.Provider>
  );
};

export { HooksModalContext, HooksModalProvider };
