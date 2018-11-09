import { createContext } from 'react';

export type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const { Provider, Consumer } = createContext<{
  styles: any;
  handleClose: () => void;
  handleListRef: any;
}>({
  styles: {},
  handleClose: () => {},
  handleListRef: () => {},
});

export { Provider, Consumer };
