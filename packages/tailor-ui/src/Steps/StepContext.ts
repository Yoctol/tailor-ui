import { createContext } from 'react';

import { theme } from '@tailor-ui/theme';

export type Status = 'finish' | 'progress' | 'wait' | 'error';
export type Direction = 'horizontal' | 'vertical';
export type Colors = keyof typeof theme.colors;

const StepContext = createContext<{
  count: number;
  status: Status;
  isLast: boolean;
  tailColor: Colors | 'gray';
  direction: Direction;
  onCurrentChange?: (count: number) => void;
}>({
  count: 0,
  status: 'wait',
  isLast: false,
  tailColor: 'gray',
  direction: 'horizontal',
  onCurrentChange: () => {},
});

export default StepContext;
