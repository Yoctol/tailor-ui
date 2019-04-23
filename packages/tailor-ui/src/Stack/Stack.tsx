// Reference: https://github.com/segmentio/evergreen/blob/master/src/stack/src/Stack.js
import React, { FunctionComponent, ReactNode, useContext } from 'react';

import { StackingOrder } from '../constants';

import StackingContext from './StackingContext';

interface StackProps {
  defaultOrder?: number;
  children: (currentValue: number) => ReactNode;
}

const Stack: FunctionComponent<StackProps> = ({
  defaultOrder = StackingOrder.STACKING_CONTEXT,
  children,
}) => {
  const previousOrder = useContext(StackingContext);
  const currentOrder = Math.max(defaultOrder, previousOrder);
  const nextOrder = currentOrder + 1;

  return (
    <StackingContext.Provider value={nextOrder}>
      {children(currentOrder)}
    </StackingContext.Provider>
  );
};

export default Stack;
