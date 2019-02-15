import React, { FunctionComponent, PureComponent } from 'react';
import styled from 'styled-components';
import {
  BorderColorProps,
  BordersProps,
  ColorProps,
  SpaceProps,
  TextAlignProps,
  WidthProps,
  borderColor,
  borders,
  color,
  space,
  textAlign,
  width,
} from 'styled-system';

import tag from '../utils/CleanTag';

type HeadColumnProps = WidthProps & SpaceProps & BordersProps & ColorProps;

const HeadColumn = styled(tag.th)<HeadColumnProps>`
  padding: ${p => p.theme.paddings.xs} ${p => p.theme.paddings.sm};
  border-color: ${p => p.theme.colors.gray300};
  font-weight: 500;

  ${width};
  ${space};
  ${borders};
  ${color};
`;

type ColumnProps = SpaceProps & BordersProps & BorderColorProps & ColorProps;

const Column = styled(tag.td)<ColumnProps>`
  padding: ${p => p.theme.paddings.xs} ${p => p.theme.paddings.sm};

  ${space};
  ${borders};
  ${borderColor};
  ${color};
`;

Column.defaultProps = {
  borderColor: 'gray300',
};

type RowProps = ColorProps;

const Row = styled(tag.tr)<RowProps>`
  border-bottom: ${p => p.theme.borders.base} ${p => p.theme.colors.gray300};

  ${color};
`;

const Head: FunctionComponent = ({ children }) => (
  <thead>
    <Row>{children}</Row>
  </thead>
);

const Body: FunctionComponent = ({ children }) => <tbody>{children}</tbody>;

type StyledTableProps = TextAlignProps & WidthProps;

const StyledTable = styled(tag.table)<StyledTableProps>`
  overflow: hidden;
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  border-top-left-radius: ${p => p.theme.radii.base};
  border-top-right-radius: ${p => p.theme.radii.base};
  box-shadow: 0 0 0 1px ${p => p.theme.colors.gray300};
  font-size: ${p => p.theme.fontSizes.sm};

  & > thead {
    border-bottom: ${p => p.theme.borders.base} ${p => p.theme.colors.gray300};
    background-color: ${p => p.theme.colors.gray100};
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
