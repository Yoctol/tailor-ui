import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useState,
} from 'react';

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
  ref
) {
  const [scrollShadow, setScrollShadow] = useState({
    start: false,
    end: true,
  });

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
        onScroll={(event) => {
          const { scrollLeft, scrollWidth, offsetWidth } = event.currentTarget;

          setScrollShadow({
            start: scrollLeft > 0,
            end: scrollLeft + offsetWidth < scrollWidth,
          });
        }}
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
