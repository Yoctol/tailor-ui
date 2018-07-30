import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  borderColor,
  borders,
  space,
  textAlign,
  themeGet,
  width,
} from 'styled-system';

const HeadColumn = styled.th`
  padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
  font-weight: 500;

  ${width};
  ${space};
  ${borders};
  ${borderColor};
`;

HeadColumn.propTypes = {
  ...width.propTypes,
  ...space.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
};

HeadColumn.defaultProps = {
  borderColor: 'gray.8',
};

const Column = styled.td`
  padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};

  ${borders};
  ${borderColor};
`;

Column.propTypes = {
  ...space.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
};

Column.defaultProps = {
  borderColor: 'gray.8',
};

const Row = styled.tr`
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
`;

const Head = ({ children }) => (
  <thead>
    <Row>{children}</Row>
  </thead>
);

Head.propTypes = {
  children: PropTypes.node,
};

Head.defaultProps = {
  children: '',
};

const Body = ({ children }) => <tbody>{children}</tbody>;

Body.propTypes = {
  children: PropTypes.node,
};

Body.defaultProps = {
  children: '',
};

const StyledTable = styled.table`
  overflow: hidden;
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  border-top-left-radius: ${themeGet('radii.1')};
  border-top-right-radius: ${themeGet('radii.1')};
  box-shadow: 0 0 0 1px ${themeGet('colors.gray.8')};

  & > thead {
    border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.8')};
    background-color: ${themeGet('colors.gray.9')};
  }

  ${textAlign};
  ${width};
`;

const Table = props => <StyledTable {...props} />;

Table.propTypes = {
  /**
   * The table width
   */
  width: PropTypes.string,
  ...width.propTypes,
  ...textAlign.propTypes,
};

Table.defaultProps = {
  width: '100%',
  textAlign: 'left', // eslint-disable-line react/default-props-match-prop-types
};

Table.Head = Head;
Table.HeadColumn = HeadColumn;
Table.Body = Body;
Table.Row = Row;
Table.Column = Column;

export default Table;
