import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

import {
  Column,
  HeadColumn,
  Row,
  StyledTable,
  StyledTableProps,
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
  Omit<StyledTableProps, 'hasHeader' | 'hasFooter'> & {
    header?: ReactNode;
    footer?: ReactNode;
  };

const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { header, footer, width = '100%', textAlign = 'center', ...props },
  ref
) {
  const optionsProps = {
    hasHeader: Boolean(header),
    hasFooter: Boolean(footer),
  };
  const table = (
    <StyledTable
      ref={ref}
      width={width as string}
      textAlign={textAlign}
      {...optionsProps}
      {...props}
    />
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

Table.Head = Head;
Table.HeadColumn = HeadColumn;
Table.Body = Body;
Table.Row = Row;
Table.Column = Column;

export { Table };
