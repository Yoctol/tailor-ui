import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  themeGet,
  width,
  space,
  textAlign,
  borders,
  borderColor,
} from 'styled-system';

import theme from '../theme';

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
  theme,
  borderColor: 'border',
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
  theme,
  borderColor: 'border',
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
  children: PropTypes.element.isRequired,
};

const Body = ({ children }) => <tbody>{children}</tbody>;

Body.propTypes = {
  children: PropTypes.element,
};

Body.defaultProps = {
  children: '',
};

const Table = styled.table`
  overflow: hidden;
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  border-top-left-radius: ${themeGet('radii.1')};
  border-top-right-radius: ${themeGet('radii.1')};
  box-shadow: 0 0 0 1px ${themeGet('colors.border')};

  & > thead {
    border-bottom: ${themeGet('borders.default')} ${themeGet('colors.border')};
    background-color: ${themeGet('colors.gray.9')};
  }

  ${textAlign};
  ${width};
`;

Table.defaultProps = {
  theme,
  width: '100%',
  textAlign: 'left',
};

Table.Head = Head;
Table.HeadColumn = HeadColumn;
Table.Body = Body;
Table.Row = Row;
Table.Column = Column;

export default Table;
