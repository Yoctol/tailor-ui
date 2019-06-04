import { createContext } from 'react';

export type Direction = 'horizontal' | 'vertical';

const RadioContext = createContext<{
  _onChange?: (value: string) => void;
  _isChecked?: (value: string) => boolean;
  direction: Direction;
}>({
  direction: 'horizontal',
});

export { RadioContext };
