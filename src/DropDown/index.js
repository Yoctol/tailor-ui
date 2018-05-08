import styled, { css } from 'styled-components';
import {
  themeGet,
  space,
  color,
  border,
  borderRadius,
  textAlign,
  width,
  top,
  right,
  fontSize,
} from 'styled-system';
import { ifProp } from 'styled-tools';

import defaultTheme from '../theme';
import { controlShadow } from '../utils/shadow';

const Dropdown = styled.div`
  position: absolute;
  z-index: 99;

  ${controlShadow(themeGet('colors.primary'))};

  ${ifProp(
    'visible',
    css`
      display: 'block';
    `,
    css`
      display: 'none';
    `
  )};

  ${width} ${top} ${right}
`;

Dropdown.defaultProps = {
  theme: defaultTheme,
  top: 36,
  right: 0,
  width: 165,
};

const List = styled.ul`
  list-style: none;

  :focus {
    outline: 0;
  }

  ${color} ${space} ${border} ${borderRadius} ${textAlign};
`;

List.defaultProps = {
  theme: defaultTheme,
  m: 0,
  p: 0,
  textAlign: 'center',
};

Dropdown.List = List;

const Item = styled.li`
  border: ${themeGet('borders.default')} ${themeGet('colors.borderDark')};
  cursor: pointer;

  :hover {
    background: #eee;
  }

  :not(:first-child) {
    border-top: 0;
  }

  ${color} ${space} ${fontSize}
`;

Item.defaultProps = {
  theme: defaultTheme,
  bg: 'light',
  color: 'bodyFont',
  fontSize: 'default',
  py: 2,
  px: 0,
};

Dropdown.Item = Item;

export default Dropdown;
