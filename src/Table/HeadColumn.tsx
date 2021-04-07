import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useRef,
} from 'react';
import { WidthProps } from 'styled-system';
import { useForkedRef } from '@reach/utils';

import { useMeasure } from '../hooks';

import { StyledHeadColumn } from './styles';
import { useFixedHeadColumn } from './FixedColumnContext';

export type HeadColumnProps = ComponentPropsWithoutRef<'th'> &
  WidthProps & {
    fixed?: 'left' | 'right';
    children?: ReactNode;
  };

const HeadColumn = forwardRef<HTMLTableHeaderCellElement, HeadColumnProps>(
  function HeadColumn(
    { children, fixed, colSpan, style = {}, ...props },
    forwardedRef
  ) {
    const ownRef = useRef<HTMLTableHeaderCellElement>(null);
    const forkedRef = useForkedRef(forwardedRef, ownRef);
    const [{ ref }, { offsetWidth }] = useMeasure(forkedRef);

    const fixedInfo = useFixedHeadColumn({
      index: ownRef.current?.cellIndex ?? -1,
      width: offsetWidth,
      fixed,
      style,
      colSpan,
    });

    return (
      <StyledHeadColumn ref={ref} {...fixedInfo} colSpan={colSpan} {...props}>
        {children}
      </StyledHeadColumn>
    );
  }
);

export default HeadColumn;
