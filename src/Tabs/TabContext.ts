import { createContext } from 'react';

export type Size = 'sm' | 'md' | 'lg';

const defaultSize = 'md';

const TabContext = createContext<{
  activeValue: string;
  setValue: (value: string) => void;
  size: Size;
  pills: boolean;
}>({
  activeValue: '',
  setValue: () => {},
  size: defaultSize as Size,
  pills: false,
});

export default TabContext;
