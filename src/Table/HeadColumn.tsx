import React, { ReactNode, forwardRef, useRef } from 'react';
import { WidthProps } from 'styled-system';
import { useForkedRef } from '@reach/utils';

import { useMeasure } from '../hooks';

import { StyledHeadColumn } from './styles';
import { useFixedHeadColumn } from './FixedColumnContext';

interface HeadColumnProps extends WidthProps {
  fixed?: 'left' | 'right';
  children: ReactNode;
}

const HeadColumn = forwardRef<HTMLTableHeaderCellElement, HeadColumnProps>(
  function HeadColumn({ children, fixed, ...props }, forwardedRef) {
    const ownRef = useRef<HTMLTableHeaderCellElement>(null);
    const forkedRef = useForkedRef(forwardedRef, ownRef);
    const [{ ref }, { offsetWidth }] = useMeasure(forkedRef);

    const fixedInfo = useFixedHeadColumn({
      index: ownRef.current?.cellIndex ?? -1,
      width: offsetWidth,
      fixed,
    });

    return (
      <StyledHeadColumn ref={ref} {...fixedInfo} {...props}>
        {children}
      </StyledHeadColumn>
    );
  }
);

export default HeadColumn;
