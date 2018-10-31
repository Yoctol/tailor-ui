import React, { SFC } from 'react';

import Flex, { FlexProps } from '../Grid/Flex';

import Item from './Item';
import SubMenu from './SubMenu';

const Menu: SFC<FlexProps> & {
  SubMenu: typeof SubMenu;
  Item: typeof Item;
} = ({ children, ...props }) => (
  <Flex
    flexDirection="column"
    justifyContent="start"
    height="100%"
    overflowY="auto"
    bg="primary"
    {...props}
  >
    {children}
  </Flex>
);

Menu.defaultProps = {
  width: 180,
};

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
