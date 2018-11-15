import React, { ReactNode, SFC, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { Spring, animated } from 'react-spring';

import styled from 'utils/styled-components';

import Icon, { IconType } from '../Icon';

import Item, { StyledItem } from './Item';

const SubMenuWrapper = styled.div`
  overflow: hidden;

  ${StyledItem /* sc-selector */} {
    padding-left: 45px;
    background-color: ${p => p.theme.colors.primaryDark};
  }
`;

const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

export interface ISubMenuProps {
  initial?: boolean;
  title: ReactNode;
  icon?: IconType;
  togglable?: boolean;
}

const SubMenu: SFC<ISubMenuProps> = ({
  initial = false,
  togglable = true,
  icon,
  title,
  children,
  ...otherProps
}) => {
  const [on, setOn] = useState(initial);

  return togglable ? (
    <>
      <Item icon={icon} onClick={() => setOn(!on)} {...otherProps}>
        {title}
        <Spring
          native
          from={{ rotate: on ? 180 : 0 }}
          to={{ rotate: on ? 180 : 0 }}
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
        from={{ height: on ? 'auto' : 0 }}
        to={{ height: on ? 'auto' : 0 }}
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
