import React, { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { animated, useSpring } from 'react-spring';

import useMeasure from 'utils/useMeasure';

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
  const [bind, { height }] = useMeasure();
  const { openKeys, handleToggleOpenKeys } = useContext(MenuContext);
  const menuOn = openKeys.indexOf(id) !== -1;

  const { rotate } = useSpring({
    rotate: menuOn ? 180 : 0,
  });
  const style = useSpring({
    height: menuOn ? height : 0,
  });

  return togglable ? (
    <>
      <Item
        icon={icon}
        onClick={() => handleToggleOpenKeys(id)}
        {...otherProps}
      >
        {title}

        <animated.div
          style={{
            pointerEvents: 'none',
            marginLeft: 'auto',
            transform: rotate.interpolate(r => `rotate(${r}deg)`),
          }}
        >
          <Icon type={MdKeyboardArrowUp} size="20" fill="light" />
        </animated.div>
      </Item>
      <AnimatedSubMenuWrapper style={style}>
        <div {...bind}>{children}</div>
      </AnimatedSubMenuWrapper>
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
