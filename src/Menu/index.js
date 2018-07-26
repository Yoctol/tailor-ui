import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Spring, animated } from 'react-spring';
import { Toggle } from 'react-powerplug';
import {
  borderRadius,
  borders,
  color,
  space,
  themeGet,
  width,
} from 'styled-system';
import { ifProp } from 'styled-tools';

import Flex from '../Grid/Flex';
import Icon from '../Icon';

const StyledMenu = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  width: 180px;
  height: 100%;
  overflow-y: auto;
  background-color: ${themeGet('colors.primary')};

  ${width};
`;

const Menu = ({ children, ...props }) => (
  <StyledMenu {...props}>{children}</StyledMenu>
);

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  ...width.propTypes,
};

const StyledItem = styled.button`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 15px;
  border: 0;
  border-left: ${themeGet('borders.xl')};
  border-left-color: transparent;
  background-color: ${themeGet('colors.primary')};
  color: rgba(255, 255, 255, 0.8);
  font-size: ${themeGet('fontSizes.default')};
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  ${ifProp(
    'active',
    css`
      border-left-color: ${themeGet('colors.secondary')};
      color: ${themeGet('colors.secondary')};
    `
  )};

  &:hover {
    border-left-color: ${themeGet('colors.secondary')};
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};
`;

const Item = ({ children, icon, active, ...props }) => (
  <StyledItem active={active} {...props}>
    {icon && (
      <Icon type={icon} mr="6px" fill={active ? 'secondary' : 'light'} />
    )}
    {children}
  </StyledItem>
);

Item.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ...space.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...borderRadius.propTypes,
};

Item.defaultProps = {
  active: false,
  icon: null,
};

const SubMenuWrapper = styled.div`
  overflow: hidden;

  ${StyledItem /* sc-selector */} {
    padding-left: 45px;
    background-color: ${themeGet('colors.primaryDark')};
  }
`;

const AnimatedSubMenuWrapper = animated(SubMenuWrapper);

const SubMenu = ({ initial, icon, title, children, ...otherProps }) => (
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
                  transform: rotate.interpolate(r => `rotate(${r}deg)`),
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

SubMenu.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  initial: PropTypes.bool,
  title: PropTypes.node.isRequired,
};

SubMenu.defaultProps = {
  icon: null,
  initial: false,
};

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
