import { createContext } from 'react';

const { Provider, Consumer } = createContext({
  _onChange: null,
  _isChecked: null,
});

export { Provider, Consumer };
