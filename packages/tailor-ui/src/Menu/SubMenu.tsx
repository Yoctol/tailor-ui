import React, { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { animated, useSpring } from 'react-spring';

import Icon, { IconType } from '../Icon';
import useMeasure from '../utils/useMeasure';

import MenuContext from './MenuContext';
import { StyledSubMenu } from './styles';

const SubMenuWrapper = styled.div`
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

const SubMenu: FunctionComponent<SubMenuProps> = ({
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
            transform: rotate.interpolate(r => `rotate(${r}deg)`),
          }}
        >
          <Icon type={MdKeyboardArrowUp} size="24" />
        </animated.div>
      </StyledSubMenu>
      <AnimatedSubMenuWrapper style={style}>
        <div {...bind}>{children}</div>
      </AnimatedSubMenuWrapper>
    </>
  );
};

export default SubMenu;
