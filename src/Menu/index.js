import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { themeGet, space, color, borders, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

import theme from '../theme';

const Menu = styled(Flex)`
  overflow-y: auto;
  width: 200px;
  height: 100%;
  flex-direction: column;
  justify-content: start;

  ${color};
`;

Menu.propTypes = {
  ...color.propTypes,
};

Menu.defaultProps = {
  theme,
  bg: 'primaryDark',
};

const Item = styled.button`
  width: 100%;
  padding: 15px 24px;
  border: 0;
  border-left: ${themeGet('borders.xl')}
    ${ifProp('active', themeGet('colors.secondary'), 'transparent')};
  flex-shrink: 0;
  color: ${themeGet('colors.light')};
  text-align: left;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  background-color: ${themeGet('colors.primaryDark')};

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};

  opacity: ${ifProp('active', 1, 0.6)};
`;

Item.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...borderRadius.propTypes,
};

Item.defaultProps = {
  theme,
};

const SubMenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  /* stylelint-disable no-duplicate-selectors */
  ${Item} {
    background-color: ${themeGet('colors.primaryDark')};
  }
  /* stylelint-enable */
`;

SubMenuWrapper.defaultProps = {
  theme,
};

const Arrow = styled.div`
  position: absolute;
  z-index: 99;
  top: 45px;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -2px;
  border-top: 8px solid ${themeGet('colors.primaryDark')};
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
`;

Arrow.defaultProps = {
  theme,
};

const SubMenuAnimation = styled.div`
  overflow: hidden;
  max-height: ${ifProp('active', '200px', 0)};
  transition: all 0.3s ease-in-out;

  /* stylelint-disable no-duplicate-selectors */
  ${Item} {
    background-color: ${themeGet('colors.primary')};

    &:last-child {
      border-bottom: ${themeGet('borders.default')} ${themeGet('colors.light')};
    }
  }
  /* stylelint-enable */
`;

SubMenuAnimation.propTypes = {
  active: PropTypes.bool.isRequired,
};

SubMenuAnimation.defaultProps = {
  theme,
};

const SubMenu = ({ title, children, active, ...otherProps }) => (
  <SubMenuWrapper>
    <Item active={active} {...otherProps}>
      {title}
    </Item>
    <Arrow />
    <SubMenuAnimation active={active}>{children}</SubMenuAnimation>
  </SubMenuWrapper>
);

SubMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
