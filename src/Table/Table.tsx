import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useComposedRefs } from '@reach/utils/compose-refs';

import { useMeasure } from '../hooks';

import Column from './Column';
import HeadColumn from './HeadColumn';
import { FixedColumnContextProvider } from './FixedColumnContext';
import {
  Row,
  StyledTable,
  StyledTableWrapper,
  StyledTableWrapperProps,
  TableWrapper,
} from './styles';

const Head = forwardRef<HTMLTableSectionElement, { children: ReactNode }>(
  function Head({ children }, ref) {
    return (
      <thead ref={ref}>
        <Row>{children}</Row>
      </thead>
    );
  }
);

const Body = forwardRef<HTMLTableSectionElement, { children: ReactNode }>(
  function Body({ children }, ref) {
    return <tbody ref={ref}>{children}</tbody>;
  }
);

export type TableProps = ComponentPropsWithoutRef<'table'> &
  Omit<StyledTableWrapperProps, 'hasHeader' | 'hasFooter'> & {
    header?: ReactNode;
    footer?: ReactNode;
  };

const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  { header, footer, width = '100%', textAlign = 'center', children, ...props },
  forwardedRef
) {
  const ownRef = useRef<HTMLDivElement>(null);
  const forkedRef = useComposedRefs(forwardedRef, ownRef);
  const [{ ref }, bounds] = useMeasure(forkedRef);

  const [scrollShadow, setScrollShadow] = useState({
    start: false,
    end: false,
  });

  const handleUpdateScrollShadow = useCallback((target: HTMLDivElement) => {
    const { scrollLeft, scrollWidth, offsetWidth } = target;

    setScrollShadow({
      start: scrollLeft > 0,
      end: scrollLeft + offsetWidth < scrollWidth,
    });
  }, []);

  useEffect(() => {
    if (ownRef.current) {
      handleUpdateScrollShadow(ownRef.current);
    }
  }, [bounds.offsetWidth, handleUpdateScrollShadow]);

  const optionsProps = {
    hasHeader: Boolean(header),
    hasFooter: Boolean(footer),
  };

  const table = (
    <FixedColumnContextProvider
      scrollShadowStart={scrollShadow.start}
      scrollShadowEnd={scrollShadow.end}
    >
      <StyledTableWrapper
        ref={ref}
        width={width as string}
        textAlign={textAlign}
        onScroll={(event) => handleUpdateScrollShadow(event.currentTarget)}
        {...optionsProps}
        {...props}
      >
        <StyledTable>{children}</StyledTable>
      </StyledTableWrapper>
    </FixedColumnContextProvider>
  );

  if (header || footer) {
    return (
      <TableWrapper ref={ref} width={width} {...optionsProps} {...props}>
        {header}
        {table}
        {footer}
      </TableWrapper>
    );
  }

  return table;
}) as React.ForwardRefExoticComponent<
  TableProps & React.RefAttributes<HTMLTableElement>
> & {
  Head: typeof Head;
  HeadColumn: typeof HeadColumn;
  Body: typeof Body;
  Row: typeof Row;
  Column: typeof Column;
};

Table.displayName = 'Table';

Table.Head = Head;
Table.HeadColumn = HeadColumn;
Table.Body = Body;
Table.Row = Row;
Table.Column = Column;

export { Table };
