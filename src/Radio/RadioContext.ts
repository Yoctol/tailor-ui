import { createContext } from 'react';

const { Provider, Consumer } = createContext<{
  _onChange?: (value: string) => void;
  _isChecked?: (value: string) => boolean;
  direction: 'horizontal' | 'verticle';
}>({
  direction: 'horizontal',
});

export { Provider, Consumer };
