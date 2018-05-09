import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  themeGet,
  space,
  color,
  borders,
  textAlign,
  width,
  top,
  right,
  fontSize,
} from 'styled-system';
import { ifProp } from 'styled-tools';
import { darken } from 'polished';

import theme from '../theme';
import { shadowVariant } from '../utils/shadow';

const Dropdown = styled.div`
  position: absolute;
  z-index: 99;
  display: ${ifProp('visible', 'block', 'none')};
  ${shadowVariant(0.1)};
  ${width};
  ${top};
  ${right};
`;

Dropdown.propTypes = {
  visible: PropTypes.bool,
  ...width.propTypes,
  ...top.propTypes,
  ...right.propTypes,
};

Dropdown.defaultProps = {
  theme,
  visible: false,
  top: 36,
  right: 0,
  width: 165,
};

const List = styled.ul`
  background-color: transparent;
  list-style: none;

  :focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${textAlign};
`;

Dropdown.propTypes = {
  ...space.propTypes,
  ...borders.propTypes,
  ...textAlign.propTypes,
};

List.defaultProps = {
  theme,
  m: 0,
  p: 0,
  textAlign: 'center',
};

Dropdown.List = List;

const Item = styled.li`
  padding: ${themeGet('space.2')} ${themeGet('space.0')};
  border: ${themeGet('borders.default')} ${themeGet('colors.borderDark')};
  cursor: pointer;

  :hover {
    background-color: ${props =>
      darken(0.05, themeGet(`colors.${props.bg}`, props.bg)(props))};
  }

  :not(:first-child) {
    border-top: 0;
  }

  ${color};
  ${space};
  ${borders};
  ${fontSize};
  transition: all 0.2s ease-in-out;
`;

Dropdown.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
  ...borders.propTypes,
  ...fontSize.propTypes,
};

Item.defaultProps = {
  theme,
  bg: 'light',
  color: 'gray.4',
  fontSize: 'default',
};

Dropdown.Item = Item;

export default Dropdown;
