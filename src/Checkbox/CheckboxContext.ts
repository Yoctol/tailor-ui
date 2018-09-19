import { createContext, ChangeEvent } from 'react';

const { Provider, Consumer } = createContext<{
  _onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  _isChecked?: (value: string) => boolean;
  direction: 'horizontal' | 'verticle';
}>({
  direction: 'horizontal',
});

export { Provider, Consumer };
