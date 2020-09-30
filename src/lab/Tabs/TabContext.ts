import { MutableRefObject, createContext } from 'react';

const TabContext = createContext<{
  activeTabRef: MutableRefObject<HTMLAnchorElement | null>;
  activeValue: string;
  setValue: (value: string) => void;
}>({
  activeTabRef: { current: null },
  activeValue: '',
  setValue: () => {},
});

TabContext.displayName = 'TabContext';

export default TabContext;
