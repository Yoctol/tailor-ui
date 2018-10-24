import { Ref, createContext } from 'react';

export type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const { Provider, Consumer } = createContext<{
  styles: any;
  handleClose: () => void;
  handleListRef: Ref<any>;
}>({
  styles: {},
  handleClose: () => {},
  handleListRef: () => {},
});

export { Provider, Consumer };
