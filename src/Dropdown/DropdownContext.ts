import { createContext } from 'react';

export type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const { Provider, Consumer } = createContext<{
  placement: Placement;
  offset: number;
  styles: any;
  onClick: () => void;
}>({
  placement: 'bottomLeft',
  offset: 0,
  styles: {},
  onClick: () => {},
});

export { Provider, Consumer };
