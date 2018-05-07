import styled, { css } from 'styled-components';
import { Flex } from 'grid-styled';
import { themeGet, space, color, border, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

import defaultTheme from '../theme';

const getMenuItemStyle = ({ active, theme }) => {
  const { gray, white } = theme.colors;

  const activeStyle = css`
    color: ${gray[0]};
    background-color: ${white};
  `;

  const defaultStyle = css`
    color: ${white};
    background-color: ${gray[0]};
  `;

  return active ? activeStyle : defaultStyle;
};

const Menu = styled(Flex)`
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: start;

  ${color};
`;

Menu.defaultProps = {
  theme: defaultTheme,
  bg: 'gray.0',
};

const MenuItem = styled.button`
  flex-shrink: 0;
  padding: 15px 30px;
  text-align: left;
  cursor: pointer;

  ${getMenuItemStyle};

  :hover {
    background-color: ${ifProp(
      'active',
      themeGet('colors.gray.2'),
      themeGet('colors.gray.4')
    )};
  }

  :focus {
    outline: 0;
  }

  ${space} ${border} ${borderRadius};
`;

MenuItem.defaultProps = {
  theme: defaultTheme,
  border: 0,
  borderRadius: 0,
};

Menu.MenuItem = MenuItem;

export default Menu;
