import { createContext } from 'react';

const DropdownContext = createContext({
  close: () => {},
});

export default DropdownContext;
