import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  themeGet,
  space,
  color,
  borders,
  textAlign,
  minWidth,
  top,
  right,
  fontSize,
} from 'styled-system';
import { ifProp } from 'styled-tools';

import { shadowVariant } from '../utils/shadow';

const Dropdown = styled.div`
  display: ${ifProp('visible', 'block', 'none')};
  position: absolute;
  z-index: 99;

  ${shadowVariant(0.1)};
  ${minWidth};
  ${top};
  ${right};
`;

Dropdown.propTypes = {
  visible: PropTypes.bool,
  ...minWidth.propTypes,
  ...top.propTypes,
  ...right.propTypes,
};

Dropdown.defaultProps = {
  visible: false,
  top: 36,
  right: 0,
  minWidth: 100,
};

const List = styled.ul`
  background-color: transparent;
  list-style: none;

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${textAlign};
`;

List.propTypes = {
  ...space.propTypes,
  ...borders.propTypes,
  ...textAlign.propTypes,
};

List.defaultProps = {
  m: 0,
  p: 0,
  textAlign: 'center',
};

Dropdown.List = List;

const Item = styled.li`
  margin-top: 0;
  padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
  border: ${themeGet('borders.default')} ${themeGet('colors.border')};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${themeGet('colors.gray.8')};
  }

  &:not(:first-child) {
    border-top: 0;
  }

  ${color};
  ${space};
  ${borders};
  ${fontSize};
`;

Item.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
  ...borders.propTypes,
  ...fontSize.propTypes,
};

Item.defaultProps = {
  bg: 'light',
  color: 'gray.4',
  fontSize: 'default',
};

Dropdown.Item = Item;

export default Dropdown;
