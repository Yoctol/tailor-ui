import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeGet, width, space } from 'styled-system';

import theme from '../theme';

const HeadColumn = styled.th`
  padding: ${themeGet('space.4')} ${themeGet('space.5')};
  font-weight: 500;

  ${width};
  ${space};
`;

HeadColumn.propTypes = {
  ...width.propTypes,
  ...space.propTypes,
};

HeadColumn.defaultProps = {
  theme,
};

const Column = styled.td`
  padding: ${themeGet('space.4')} ${themeGet('space.5')};
`;

Column.propTypes = {
  ...space.propTypes,
};

Column.defaultProps = {
  theme,
};

const Row = styled.tr`
  border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
`;

Row.defaultProps = {
  theme,
};

const Head = ({ children }) => (
  <thead>
    <Row>{children}</Row>
  </thead>
);

Head.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const Body = ({ children }) => <tbody>{children}</tbody>;

Body.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

Column.defaultProps = {
  theme,
};

const Table = styled.table`
  overflow: hidden;
  box-shadow: 0 0 0 1px ${themeGet('colors.border')};
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
  border-style: hidden;
  border-top-left-radius: ${themeGet('radii.1')};
  border-top-right-radius: ${themeGet('radii.1')};

  & > thead {
    border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
    background-color: ${themeGet('colors.gray.9')};
  }

  ${width};
`;

Table.defaultProps = {
  theme,
  width: '100%',
};

Table.Head = Head;
Table.HeadColumn = HeadColumn;
Table.Body = Body;
Table.Row = Row;
Table.Column = Column;

export default Table;
