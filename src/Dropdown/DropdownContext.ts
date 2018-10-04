import { createContext } from 'react';

export type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const { Provider, Consumer } = createContext<{
  offset: {
    top: number;
    left: number;
  };
  styles: any;
  handleClose: () => void;
  handleListRef: (ref: HTMLElement) => void;
}>({
  offset: {
    top: 0,
    left: 0,
  },
  styles: {},
  handleClose: () => {},
  handleListRef: () => {},
});

export { Provider, Consumer };
