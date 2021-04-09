import React, { FC, MutableRefObject, createContext, useRef } from 'react';

import HooksMessage, { Trigger } from './HooksMessage';

const HooksMessageContext = createContext<MutableRefObject<Trigger>>({
  current: () => Promise.resolve(false),
});

HooksMessageContext.displayName = 'HooksMessageContext';

const HooksMessageProvider: FC = ({ children }) => {
  const messageTriggerRef = useRef<Trigger>(() => Promise.resolve(false));

  return (
    <HooksMessageContext.Provider value={messageTriggerRef}>
      {children}
      <HooksMessage triggerRef={messageTriggerRef} />
    </HooksMessageContext.Provider>
  );
};

export { HooksMessageContext, HooksMessageProvider };
