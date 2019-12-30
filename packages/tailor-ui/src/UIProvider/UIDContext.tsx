import React, { FC, createContext, useContext, useRef } from 'react';

const UIDContext = createContext<() => string>(() => 'tailor_uid_0');

UIDContext.displayName = 'UIDContext';

const UIDProvider: FC = ({ children }) => {
  const UID = useRef(0);

  const getUID = () => {
    UID.current += 1;

    return `tailor_uid_${UID.current}`;
  };

  return <UIDContext.Provider value={getUID}>{children}</UIDContext.Provider>;
};

const useUID = () => useContext(UIDContext);

export { UIDContext, UIDProvider, useUID };
