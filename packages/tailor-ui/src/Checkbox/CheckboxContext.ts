import { ChangeEvent, createContext } from 'react';

export type Direction = 'horizontal' | 'vertical';

const CheckboxContext = createContext<{
  handleChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  isChecked?: (value: string) => boolean;
  direction: Direction;
}>({
  direction: 'horizontal',
});

export { CheckboxContext };
