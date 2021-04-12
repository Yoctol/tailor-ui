import React, { FC, MutableRefObject, createContext, useRef } from 'react';

import { tuplify } from '../utils';

import HooksNotification, { Trigger } from './HooksNotification';

const defaultTrigger = {
  open: () => tuplify(Promise.resolve(false), () => {}),
  close: () => {},
  destroy: () => {},
};

const HooksNotificationContext = createContext<MutableRefObject<Trigger>>({
  current: defaultTrigger,
});

HooksNotificationContext.displayName = 'HooksNotificationContext';

const HooksNotificationProvider: FC = ({ children }) => {
  const notificationTriggerRef = useRef<Trigger>(defaultTrigger);

  return (
    <HooksNotificationContext.Provider value={notificationTriggerRef}>
      {children}
      <HooksNotification triggerRef={notificationTriggerRef} />
    </HooksNotificationContext.Provider>
  );
};

export { HooksNotificationContext, HooksNotificationProvider };
