import { createContext } from 'react';

export type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const { Provider, Consumer } = createContext<{
  placement: Placement;
  offset: object;
  styles: any;
  onClick: () => void;
  handleListRef: (ref: any) => void;
}>({
  placement: 'bottomLeft',
  offset: {},
  styles: {},
  onClick: () => {},
  handleListRef: () => {},
});

export { Provider, Consumer };
