import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet, space, color, borders, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

import { Flex } from '../';

const Menu = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  width: 200px;
  height: 100%;
  overflow-y: auto;

  ${color};
`;

Menu.propTypes = {
  ...color.propTypes,
};

Menu.defaultProps = {
  bg: 'primaryDark',
};

const Item = styled.button`
  flex-shrink: 0;
  width: 100%;
  padding: ${themeGet('space.4')} ${themeGet('space.6')};
  border: 0;
  border-left: ${themeGet('borders.xl')}
    ${ifProp('active', themeGet('colors.secondary'), 'transparent')};
  background-color: ${themeGet('colors.primaryDark')};
  color: ${ifProp(
    'active',
    themeGet('colors.light'),
    themeGet('colors.gray.4')
  )};
  font-size: ${themeGet('fontSizes.default')};
  text-align: left;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${themeGet('colors.light')};
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};
`;

Item.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...borderRadius.propTypes,
};

const SubMenuWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  /* stylelint-disable no-duplicate-selectors */
  ${Item} {
    background-color: ${themeGet('colors.primaryDark')};
  }
  /* stylelint-enable */
`;

const Arrow = styled.div`
  position: absolute;
  z-index: 99;
  top: 50px;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -2px;
  border-top: 8px solid ${themeGet('colors.primaryDark')};
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
`;

const SubMenuAnimation = styled.div`
  max-height: ${ifProp('active', '200px', 0)};
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  ${ifProp(
    'active',
    css`
      border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.7')};
    `
  )}

  /* stylelint-disable no-duplicate-selectors */
  ${Item} {
    background-color: ${themeGet('colors.primary')};
  }
  /* stylelint-enable */
`;

SubMenuAnimation.propTypes = {
  active: PropTypes.bool.isRequired,
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
