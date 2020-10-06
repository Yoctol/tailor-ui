import React, { FC, ReactNode } from 'react';

import {
  Column,
  HeadColumn,
  Row,
  StyledTable,
  StyledTableProps,
  TableWrapper,
} from './styles';

const Head: FC = ({ children }) => (
  <thead>
    <Row>{children}</Row>
  </thead>
);

const Body: FC = ({ children }) => <tbody>{children}</tbody>;

export type TableProps = Omit<StyledTableProps, 'hasHeader' | 'hasFooter'> & {
  header?: ReactNode;
  footer?: ReactNode;
};

const Table: FC<TableProps> & {
  Head: typeof Head;
  HeadColumn: typeof HeadColumn;
  Body: typeof Body;
  Row: typeof Row;
  Column: typeof Column;
} = ({ header, footer, width = '100%', textAlign = 'center', ...props }) => {
  const optionsProps = {
    hasHeader: Boolean(header),
    hasFooter: Boolean(footer),
  };
  const table = (
    <StyledTable
      {...optionsProps}
      width={width as string}
      textAlign={textAlign}
      {...props}
    />
  );

  if (header || footer) {
    return (
      <TableWrapper {...optionsProps} width={width}>
        {header}
        {table}
        {footer}
      </TableWrapper>
    );
  }

  return table;
};

Table.Head = Head;
Table.HeadColumn = HeadColumn;
Table.Body = Body;
Table.Row = Row;
Table.Column = Column;

export { Table };
