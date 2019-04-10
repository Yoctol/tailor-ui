import React, { FunctionComponent, useState } from 'react';

import Flex from '../Grid/Flex';

import Item from './Item';
import MenuContext from './MenuContext';
import SubMenu from './SubMenu';

interface MenuProps {
  width: number;
  currentSubOnly?: boolean;
  subKeys?: string[];
  defaultSubKeys?: string[];
  onUpdateSubKeys?: (keys: string[]) => void;
}

const Menu: FunctionComponent<MenuProps> & {
  SubMenu: typeof SubMenu;
  Item: typeof Item;
} = ({
  children,
  currentSubOnly,
  subKeys,
  onUpdateSubKeys,
  defaultSubKeys,
  ...props
}) => {
  const [ownOpenKeys, setOwnOpenKeys] = useState<string[]>(
    defaultSubKeys || []
  );

  const openKeys = subKeys || ownOpenKeys;
  const setOpenKeys = onUpdateSubKeys || setOwnOpenKeys;

  return (
    <MenuContext.Provider
      value={{
        openKeys,
        handleToggleOpenKeys: key => {
          if (openKeys.includes(key)) {
            setOpenKeys(openKeys.filter(openKey => openKey !== key));
          } else {
            setOpenKeys(currentSubOnly ? [key] : [...openKeys, key]);
          }
        },
      }}
    >
      <Flex
        flexDirection="column"
        justifyContent="start"
        height="100%"
        overflowY="auto"
        bg="primaryDark2"
        {...props}
      >
        {children}
      </Flex>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  width: 240,
  currentSubOnly: false,
  defaultSubKeys: [],
};

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
