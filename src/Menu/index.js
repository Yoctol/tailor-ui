import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import styled, { css } from 'styled-components';
import { Spring, animated } from 'react-spring';
import { Toggle, Value } from 'react-powerplug';
import { borderRadius, borders, color, space, themeGet } from 'styled-system';
import { ifProp } from 'styled-tools';

import Flex from '../Grid/Flex';
import Icon from '../Icon';

const { Provider, Consumer } = createContext();

const StyledMenu = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  width: 180px;
  height: 100%;
  overflow-y: auto;
  background-color: ${themeGet('colors.primary')};
`;

const Menu = ({ initial, children, onChange }) => (
  <Value onChange={onChange} initial={initial}>
    {({ value, set }) => (
      <Provider value={{ activeKey: value, setActiveKey: set }}>
        <StyledMenu>{children}</StyledMenu>
      </Provider>
    )}
  </Value>
);

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  initial: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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
      border-left-color: ${themeGet('colors.secondaryYellow.secondary')};
      color: ${themeGet('colors.secondaryYellow.secondary')};
    `
  )};

  &:hover {
    border-left-color: ${themeGet('colors.secondaryYellow.secondary')};
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};
`;

const Item = ({ children, icon, value, ...props }) => (
  <Consumer>
    {({ activeKey, setActiveKey }) => {
      const active = activeKey === value;
      return (
        <StyledItem
          active={active}
          onClick={() => setActiveKey(value)}
          {...props}
        >
          {icon && (
            <Icon
              type={icon}
              mr="6px"
              fill={active ? 'secondaryYellow.secondary' : 'light'}
            />
          )}
          {children}
        </StyledItem>
      );
    }}
  </Consumer>
);

Item.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...borderRadius.propTypes,
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
          <Spring native from={{ rotate: 0 }} to={{ rotate: on ? 180 : 0 }}>
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
        <Spring native from={{ height: 0 }} to={{ height: on ? 'auto' : 0 }}>
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
