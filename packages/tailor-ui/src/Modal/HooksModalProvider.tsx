import React, {
  FunctionComponent,
  MutableRefObject,
  createContext,
  useRef,
} from 'react';

import HooksModal, { Trigger } from './HooksModal';

const HooksModalContext = createContext<MutableRefObject<Trigger>>({
  current: () => Promise.resolve(false),
});

const HooksModalProvider: FunctionComponent = ({ children }) => {
  const modalTriggerRef = useRef(() => Promise.resolve(false));

  return (
    <HooksModalContext.Provider value={modalTriggerRef}>
      {children}
      <HooksModal triggerRef={modalTriggerRef} />
    </HooksModalContext.Provider>
  );
};

export { HooksModalContext, HooksModalProvider };