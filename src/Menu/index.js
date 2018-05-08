import styled, { css } from 'styled-components';
import { Flex } from 'grid-styled';
import { themeGet, space, color, border, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

import defaultTheme from '../theme';

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
  bg: 'gray.4',
};

const MenuItem = styled.button`
  flex-shrink: 0;
  padding: 15px 30px;
  text-align: left;
  cursor: pointer;

  ${ifProp(
    'active',
    css`
      color: ${themeGet('colors.bodyFont')}
      background-color: ${themeGet('colors.light')};;
    `,
    css`
      color: ${themeGet('colors.light')};
      background-color: ${themeGet('colors.gray.4')};
    `
  )}

  :hover {
    background-color: ${ifProp(
      'active',
      themeGet('colors.gray.7'),
      themeGet('colors.gray.3')
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
};

Menu.MenuItem = MenuItem;

export default Menu;
