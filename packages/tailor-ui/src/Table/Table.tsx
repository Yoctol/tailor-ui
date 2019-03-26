import React, { FunctionComponent, ReactNode } from 'react';

import {
  Column,
  HeadColumn,
  Row,
  StyledTable,
  StyledTableProps,
  TableWrapper,
} from './styles';

const Head: FunctionComponent = ({ children }) => (
  <thead>
    <Row>{children}</Row>
  </thead>
);

const Body: FunctionComponent = ({ children }) => <tbody>{children}</tbody>;

export type TableProps = StyledTableProps & {
  header?: ReactNode;
  footer?: ReactNode;
};

const Table: FunctionComponent<TableProps> & {
  Head: typeof Head;
  HeadColumn: typeof HeadColumn;
  Body: typeof Body;
  Row: typeof Row;
  Column: typeof Column;
} = ({ header, footer, ...props }) => {
  const table = <StyledTable {...props} />;

  if (header || footer) {
    return (
      <TableWrapper
        hasHeader={Boolean(header)}
        hasFooter={Boolean(footer)}
        width={props.width}
      >
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

Table.defaultProps = {
  width: '100%',
  textAlign: 'center',
};

export default Table;
