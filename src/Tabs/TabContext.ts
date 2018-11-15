import { createContext } from 'react';

export type Size = 'sm' | 'md' | 'lg';

const TabContext = createContext<{
  activeValue: string;
  setValue: (value: string) => void;
  size: Size;
  pills: boolean;
}>({
  activeValue: '',
  setValue: () => {},
  size: 'md',
  pills: false,
});

export default TabContext;
