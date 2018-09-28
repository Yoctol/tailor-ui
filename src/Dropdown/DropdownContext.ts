import { createContext } from 'react';

export type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const { Provider, Consumer } = createContext<{
  placement: Placement;
  offset: {
    top: number;
    left: number;
  };
  styles: any;
  onClick: () => void;
  handleListRef: (ref: any) => void;
}>({
  placement: 'bottomLeft',
  offset: {
    top: 0,
    left: 0,
  },
  styles: {},
  onClick: () => {},
  handleListRef: () => {},
});

export { Provider, Consumer };
