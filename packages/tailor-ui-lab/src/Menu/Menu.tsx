import React, { FunctionComponent, useRef, useState } from 'react';
import { config, useChain, useSpring } from 'react-spring';

import { Backdrop, Flex } from 'tailor-ui';

import MenuContext from './MenuContext';
import MenuDivider from './MenuDivider';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { SubMenuWrapper } from './styles';

const spring = { ...config.stiff, precision: 0.1 };

export interface MenuProps {
  defaultActiveSubId?: string;
  defaultActiveItemId?: string;
}

const Menu: FunctionComponent<MenuProps> & {
  SubMenu: typeof SubMenu;
  Divider: typeof MenuDivider;
  Item: typeof MenuItem;
} = ({ children, defaultActiveSubId = null, defaultActiveItemId = null }) => {
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [activeSubId, setActiveSubId] = useState<string | null>(
    defaultActiveSubId
  );
  const [activeItemId, setActiveItemId] = useState(defaultActiveItemId);

  const subMenuSpringRef = useRef(null);
  const subMenuSpringProps = useSpring({
    width: subMenuVisible ? 180 : 0,
    opacity: subMenuVisible ? 1 : 0,
    config: spring,
    ref: subMenuSpringRef,
  });

  const subMenuContentSpringRef = useRef(null);
  const subMenuContentSpringProps = useSpring({
    opacity: subMenuVisible ? 1 : 0,
    config: spring,
    ref: subMenuContentSpringRef,
  });

  useChain(
    subMenuVisible
      ? [subMenuSpringRef, subMenuContentSpringRef]
      : [subMenuContentSpringRef, subMenuSpringRef],
    [0, subMenuVisible ? 0.3 : 0.1]
  );

  return (
    <MenuContext.Provider
      value={{
        subMenuVisible,
        activeSubId,
        subMenuContentSpringProps,
        setActiveSubId: subId => {
          if (subId === activeSubId) {
            setSubMenuVisible(visible => !visible);
          } else {
            setSubMenuVisible(true);
            setActiveSubId(subId);
          }
        },
        activeItemId,
        setActiveItemId: itemId => {
          setActiveItemId(itemId);
          setSubMenuVisible(false);
        },
      }}
    >
      <>
        <Flex
          flexDirection="column"
          height="100%"
          width="48px"
          bg="primaryDark"
          position="relative"
        >
          {children}
          <SubMenuWrapper style={subMenuSpringProps} />
          <Backdrop
            visible={subMenuVisible}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            onClick={() => setSubMenuVisible(false)}
          />
        </Flex>
      </>
    </MenuContext.Provider>
  );
};

Menu.Divider = MenuDivider;
Menu.SubMenu = SubMenu;
Menu.Item = MenuItem;

export default Menu;
