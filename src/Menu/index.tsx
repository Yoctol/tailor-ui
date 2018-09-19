import React, { PureComponent } from 'react';

import Flex, { FlexProps } from '../Grid/Flex';

import Item from './Item';
import SubMenu from './SubMenu';

class Menu extends PureComponent<FlexProps> {
  static SubMenu = SubMenu;

  static Item = Item;

  render() {
    const { children, width = 180, ...props } = this.props;
    return (
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
  }
}

export default Menu;
