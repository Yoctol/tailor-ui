import { ChangeEvent, createContext } from 'react';

export type Direction = 'horizontal' | 'vertical';

const CheckboxContext = createContext<{
  _onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  _isChecked?: (value: string) => boolean;
  direction: Direction;
}>({
  direction: 'horizontal',
});

export default CheckboxContext;
