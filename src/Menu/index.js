import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Spring, animated } from 'react-spring';
import { themeGet, space, color, borders, borderRadius } from 'styled-system';
import { ifProp } from 'styled-tools';

import { Flex } from '../';
import { IconWrapper } from '../Icon';

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
  padding: ${themeGet('space.3')} ${themeGet('space.5')};
  border: 0;
  border-left: ${themeGet('borders.xl')};
  border-left-color: transparent;
  background-color: ${themeGet('colors.primaryDark')};
  color: ${themeGet('colors.gray.4')};
  font-size: ${themeGet('fontSizes.default')};
  line-height: ${themeGet('space.6')};
  text-align: left;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  & ${IconWrapper /* sc-selector */} {
    margin-right: 7px;
    vertical-align: 10%;

    svg {
      fill: ${themeGet('colors.gray.4')};
    }
  }

  ${ifProp(
    'active',
    css`
      border-left-color: ${themeGet('colors.secondary')};
      color: ${themeGet('colors.light')};

      /* stylelint-disable-next-line */
      & ${IconWrapper /* sc-selector */} svg {
        fill: ${themeGet('colors.light')};
      }
    `
  )};

  &:hover {
    color: ${themeGet('colors.light')};

    & ${IconWrapper /* sc-selector */} svg {
      fill: ${themeGet('colors.light')};
    }
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};
`;

Item.propTypes = {
  active: PropTypes.bool.isRequired,
  ...space.propTypes,
  ...color.propTypes,
  ...borders.propTypes,
  ...borderRadius.propTypes,
};

Item.defaultProps = {
  active: false,
};

const SubMenuWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  ${Item /* sc-selector */} {
    background-color: ${themeGet('colors.primaryDark')};
  }
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

const Animation = styled.div`
  overflow: hidden;

  ${Item /* sc-selector */} {
    background-color: ${themeGet('colors.primary')};
  }

  ${ifProp(
    'active',
    css`
      border-bottom: ${themeGet('borders.default')} ${themeGet('colors.gray.7')};
    `
  )};
`;

const AnimationWrapper = Animation;

const SubMenu = ({ title, children, active, ...otherProps }) => (
  <SubMenuWrapper>
    <Item active={active} {...otherProps}>
      {title}
    </Item>
    <Arrow />
    <AnimationWrapper active={active}>
      <Spring native from={{ height: 0 }} to={{ height: active ? 'auto' : 0 }}>
        {props => <animated.div style={props}>{children}</animated.div>}
      </Spring>
    </AnimationWrapper>
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
