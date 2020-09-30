import { createContext } from 'react';

const DropdownContext = createContext({
  close: () => {},
});

DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
