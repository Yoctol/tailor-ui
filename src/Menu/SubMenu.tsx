import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import React, { PureComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import { Toggle } from 'react-powerplug';
import { themeGet } from 'styled-system';

import Icon, { IconType } from '../Icon';

import Item, { StyledItem } from './Item';

const SubMenuWrapper = styled.div`
  overflow: hidden;

  ${StyledItem /* sc-selector */} {
    padding-left: 45px;
    background-color: ${themeGet('colors.primaryDark')};
  }
`;

const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

export interface SubMenuProps {
  initial: boolean;
  title: ReactNode;
  icon: IconType;
}

class SubMenu extends PureComponent<SubMenuProps> {
  render() {
    const {
      initial = false,
      icon,
      title,
      children,
      ...otherProps
    } = this.props;

    return (
      <Toggle initial={initial}>
        {({ on, toggle }) => (
          <>
            <Item icon={icon} onClick={toggle} {...otherProps}>
              {title}
              <Spring
                native
                from={{ rotate: on ? 180 : 0 }}
                to={{ rotate: on ? 180 : 0 }}
              >
                {({ rotate }) => (
                  <animated.div
                    style={{
                      pointerEvents: 'none',
                      marginLeft: 'auto',
                      transform: rotate.interpolate(
                        (r: number) => `rotate(${r}deg)`
                      ),
                    }}
                  >
                    <Icon type={ArrowUp} size="20" fill="light" />
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
        )}
      </Toggle>
    );
  }
}

export default SubMenu;
