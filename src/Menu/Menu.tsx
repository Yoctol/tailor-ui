import React, { FunctionComponent, useState } from 'react';

import Flex, { FlexProps } from '../Grid/Flex';

import Item from './Item';
import MenuContext from './MenuContext';
import SubMenu from './SubMenu';

interface IMenuProps {
  currentSubOnly?: boolean;
  defaultSubKeys?: string[];
}

const Menu: FunctionComponent<FlexProps & IMenuProps> & {
  SubMenu: typeof SubMenu;
  Item: typeof Item;
} = ({ children, currentSubOnly, defaultSubKeys, ...props }) => {
  const [openKeys, setOpenKeys] = useState<Set<string>>(
    new Set(defaultSubKeys)
  );

  return (
    <MenuContext.Provider
      value={{
        openKeys,
        handleToggleOpenKeys: key => {
          if (openKeys.has(key)) {
            openKeys.delete(key);
            setOpenKeys(openKeys);
          } else {
            if (currentSubOnly) {
              openKeys.clear();
            }
            setOpenKeys(openKeys.add(key));
          }
        },
      }}
    >
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
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  width: 180,
  currentSubOnly: false,
  defaultSubKeys: [],
};

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
