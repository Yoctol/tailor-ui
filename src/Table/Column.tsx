import React, { ReactNode, forwardRef, useMemo, useRef } from 'react';
import { useForkedRef } from '@reach/utils';

import { StyledColumn } from './styles';
import { useFixedColumnContext } from './FixedColumnContext';

const Column = forwardRef<HTMLTableDataCellElement, { children: ReactNode }>(
  function Column({ children, ...props }, forwardedRef) {
    const ownRef = useRef<HTMLTableDataCellElement>(null);
    const ref = useForkedRef(forwardedRef, ownRef);

    const { getColumnFixedInfo } = useFixedColumnContext();
    const fixedInfo = useMemo(
      () => getColumnFixedInfo(ownRef.current?.cellIndex ?? -1),
      [getColumnFixedInfo]
    );

    return (
      <StyledColumn ref={ref} {...fixedInfo} {...props}>
        {children}
      </StyledColumn>
    );
  }
);

export default Column;
