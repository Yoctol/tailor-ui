import styled, { css } from 'styled-components';
import { Flex } from 'grid-styled';
import { themeGet, space, color, borders, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

import defaultTheme from '../theme';

const Menu = styled(Flex)`
  overflow-y: auto;
  width: 200px;
  height: 100%;
  flex-direction: column;
  justify-content: start;
  ${color};
`;

Menu.propTypes = {
  ...color.propTypes,
};

Menu.defaultProps = {
  theme: defaultTheme,
  bg: 'gray.4',
};

const Item = styled.button`
  padding: 15px 30px;
  flex-shrink: 0;
  text-align: left;
  cursor: pointer;
  ${ifProp(
    'active',
    css`
      color: ${themeGet('colors.bodyFont')};
      background-color: ${themeGet('colors.light')};
    `,
    css`
      color: ${themeGet('colors.light')};
      background-color: ${themeGet('colors.gray.4')};
    `
  )} &:hover {
    background-color: ${ifProp(
      'active',
      themeGet('colors.gray.7'),
      themeGet('colors.gray.3')
    )};
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};
`;

Item.propTypes = {
  ...space.propTypes,
  ...borders.propTypes,
  ...borderRadius.propTypes,
};

Item.defaultProps = {
  theme: defaultTheme,
  border: 0,
};

Menu.Item = Item;

export default Menu;
