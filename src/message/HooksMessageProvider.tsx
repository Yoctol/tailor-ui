import React, {
  FC,
  MutableRefObject,
  createContext,
  useCallback,
  useRef,
} from 'react';

import HooksMessage, { Trigger } from './HooksMessage';

const HooksMessageContext = createContext<MutableRefObject<Trigger>>({
  current: () => Promise.resolve(false),
});

HooksMessageContext.displayName = 'HooksMessageContext';

const HooksMessageProvider: FC = ({ children }) => {
  const messageTriggerRef = useRef<Trigger>(() => Promise.resolve(false));

  const setTrigger = useCallback((trigger) => {
    messageTriggerRef.current = trigger;
  }, []);

  return (
    <HooksMessageContext.Provider value={messageTriggerRef}>
      {children}
      <HooksMessage setTrigger={setTrigger} />
    </HooksMessageContext.Provider>
  );
};

export { HooksMessageContext, HooksMessageProvider };
