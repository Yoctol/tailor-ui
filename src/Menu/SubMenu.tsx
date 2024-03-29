import React, { FC, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { animated, to, useSpring } from '@react-spring/web';

import { Icon, IconType } from '../Icon';
import { useMeasure } from '../hooks';

import MenuContext from './MenuContext';
import { StyledSubMenu } from './styles';

const SubMenuWrapper = styled.div`
  flex: none;
  overflow: hidden;
`;

const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

export interface SubMenuProps {
  id: string;
  initial?: boolean;
  title: ReactNode;
  icon?: IconType;
  togglable?: boolean;
}

const SubMenu: FC<SubMenuProps> = ({
  id,
  icon,
  title,
  children,
  ...otherProps
}) => {
  const [bind, { height }] = useMeasure();
  const { openKeys, handleToggleOpenKeys } = useContext(MenuContext);
  const menuOn = openKeys.includes(id);

  const { rotate } = useSpring({
    rotate: menuOn ? '180' : '0',
  });

  const style = useSpring({
    height: menuOn ? height : 0,
    opacity: menuOn ? 1 : 0,
  });

  return (
    <>
      <StyledSubMenu
        active={menuOn}
        onClick={() => handleToggleOpenKeys(id)}
        {...otherProps}
      >
        {icon && <Icon type={icon} mr="12px" />}

        {title}

        <animated.div
          style={{
            display: 'inline-flex',
            pointerEvents: 'none',
            marginLeft: 'auto',
            transform: to(rotate, (r) => `rotate(${r}deg)`),
          }}
        >
          <Icon type={MdKeyboardArrowDown} size="24" />
        </animated.div>
      </StyledSubMenu>
      <AnimatedSubMenuWrapper style={style}>
        <div {...bind}>{children}</div>
      </AnimatedSubMenuWrapper>
    </>
  );
};

export default SubMenu;
