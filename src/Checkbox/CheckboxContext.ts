import { ChangeEvent, createContext } from 'react';

import { Direction } from './Checkbox';

const { Provider, Consumer } = createContext<{
  _onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  _isChecked?: (value: string) => boolean;
  direction: Direction;
}>({
  direction: 'horizontal',
});

export { Provider, Consumer };
