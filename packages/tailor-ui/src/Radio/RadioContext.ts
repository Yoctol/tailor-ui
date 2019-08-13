import { createContext } from 'react';

export type Direction = 'horizontal' | 'vertical';

const RadioContext = createContext<{
  handleChange?: (value: string) => void;
  isChecked?: (value: string) => boolean;
  direction: Direction;
}>({
  direction: 'horizontal',
});

export { RadioContext };
