import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useMemo,
  useRef,
} from 'react';
import { WidthProps } from 'styled-system';
import { useComposedRefs } from '@reach/utils/compose-refs';

import { StyledColumn } from './styles';
import { useFixedColumnContext } from './FixedColumnContext';

export type ColumnProps = ComponentPropsWithoutRef<'td'> &
  WidthProps & {
    children?: ReactNode;
  };

const Column = forwardRef<HTMLTableDataCellElement, ColumnProps>(
  function Column({ children, style = {}, ...props }, forwardedRef) {
    const ownRef = useRef<HTMLTableDataCellElement>(null);
    const ref = useComposedRefs(forwardedRef, ownRef);

    const { getColumnFixedInfo } = useFixedColumnContext();
    const fixedInfo = useMemo(
      () =>
        getColumnFixedInfo({ index: ownRef.current?.cellIndex ?? -1, style }),
      [getColumnFixedInfo, style]
    );

    return (
      <StyledColumn ref={ref} {...fixedInfo} {...props}>
        {children}
      </StyledColumn>
    );
  }
);

export default Column;
