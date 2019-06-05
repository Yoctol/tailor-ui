import React, {
  FunctionComponent,
  createContext,
  useContext,
  useRef,
} from 'react';

const UIDContext = createContext<() => string>(() => 'tailor_uid_0');

const UIDProvider: FunctionComponent = ({ children }) => {
  const UID = useRef(0);

  const getUID = () => {
    UID.current += 1;

    return `tailor_uid_${UID.current}`;
  };

  return <UIDContext.Provider value={getUID}>{children}</UIDContext.Provider>;
};

const useUID = () => useContext(UIDContext);

export { UIDContext, UIDProvider, useUID };
