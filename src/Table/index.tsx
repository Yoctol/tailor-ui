import React, { PureComponent, SFC } from 'react';
import styled from 'styled-components';
import {
  BorderColorProps,
  BordersProps,
  SpaceProps,
  TextAlignProps,
  WidthProps,
  borderColor,
  borders,
  space,
  textAlign,
  themeGet,
  width,
} from 'styled-system';

type HeadColumnProps = WidthProps &
  SpaceProps &
  BordersProps &
  BorderColorProps;

const HeadColumn = styled<HeadColumnProps, 'th'>('th')`
  padding: ${themeGet('paddings.xs')} ${themeGet('paddings.sm')};
  font-weight: 500;

  ${width};
  ${space};
  ${borders};
  ${borderColor};
`;

HeadColumn.defaultProps = {
  borderColor: 'gray.8',
};

type ColumnProps = SpaceProps & BordersProps & BorderColorProps;

const Column = styled<ColumnProps, 'td'>('td').attrs({
  borderColor: 'gray.8',
})`
  padding: ${themeGet('paddings.xs')} ${themeGet('paddings.sm')};

  ${space} ${borders};
  ${borderColor};
`;

const Row = styled.tr`
  border-bottom: ${themeGet('borders.base')} ${themeGet('colors.gray.8')};
`;

const Head: SFC = ({ children }) => (
  <thead>
    <Row>{children}</Row>
  </thead>
);

const Body: SFC = ({ children }) => <tbody>{children}</tbody>;

type StyledTableProps = TextAlignProps & WidthProps;

const StyledTable = styled<StyledTableProps, 'table'>('table')`
  overflow: hidden;
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  border-top-left-radius: ${themeGet('radii.base')};
  border-top-right-radius: ${themeGet('radii.base')};
  box-shadow: 0 0 0 1px ${themeGet('colors.gray.8')};
  font-size: ${themeGet('fontSizes.sm')};

  & > thead {
    border-bottom: ${themeGet('borders.base')} ${themeGet('colors.gray.8')};
    background-color: ${themeGet('colors.gray.9')};
  }

  ${width};
  ${textAlign};
`;

class Table extends PureComponent<StyledTableProps> {
  static Head = Head;

  static HeadColumn = HeadColumn;

  static Body = Body;

  static Row = Row;

  static Column = Column;

  static defaultProps = {
    width: '100%',
    textAlign: 'left',
  };

  render() {
    return <StyledTable {...this.props} />;
  }
}

export default Table;
