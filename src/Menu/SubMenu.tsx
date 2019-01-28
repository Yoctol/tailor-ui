import React, { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { Spring, animated } from 'react-spring';

import Icon, { IconType } from '../Icon';

import Item, { StyledItem } from './Item';
import MenuContext from './MenuContext';

const SubMenuWrapper = styled.div`
  overflow: hidden;

  ${StyledItem /* sc-selector */} {
    padding-left: 45px;
    background-color: ${p => p.theme.colors.primaryDark};
  }
`;

const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

export interface ISubMenuProps {
  id: string;
  initial?: boolean;
  title: ReactNode;
  icon?: IconType;
  togglable?: boolean;
}

const SubMenu: FunctionComponent<ISubMenuProps> = ({
  togglable = true,
  id,
  icon,
  title,
  children,
  ...otherProps
}) => {
  const { openKeys, handleToggleOpenKeys } = useContext(MenuContext);
  const menuOn = openKeys.has(id);

  return togglable ? (
    <>
      <Item
        icon={icon}
        onClick={() => handleToggleOpenKeys(id)}
        {...otherProps}
      >
        {title}
        <Spring
          native
          from={{ rotate: menuOn ? 180 : 0 }}
          to={{ rotate: menuOn ? 180 : 0 }}
        >
          {({ rotate }: { rotate: any }) => (
            <animated.div
              style={{
                pointerEvents: 'none',
                marginLeft: 'auto',
                transform: rotate.interpolate((r: number) => `rotate(${r}deg)`),
              }}
            >
              <Icon type={MdKeyboardArrowUp} size="20" fill="light" />
            </animated.div>
          )}
        </Spring>
      </Item>
      <Spring
        native
        from={{ height: menuOn ? 'auto' : 0 }}
        to={{ height: menuOn ? 'auto' : 0 }}
      >
        {style => (
          <AnimatedSubMenuWrapper style={style}>
            {children}
          </AnimatedSubMenuWrapper>
        )}
      </Spring>
    </>
  ) : (
    <>
      <Item icon={icon} {...otherProps}>
        {title}
      </Item>
      <SubMenuWrapper>{children}</SubMenuWrapper>
    </>
  );
};

export default SubMenu;
