import { createContext } from 'react';

const { Provider, Consumer } = createContext({
  _onChange: null,
  _values: null,
});

export { Provider, Consumer };
