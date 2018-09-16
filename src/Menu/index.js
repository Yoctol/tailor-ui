import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { themeGet, width } from 'styled-system';

import Flex from '../Grid/Flex';

import Item from './Item';
import SubMenu from './SubMenu';

const StyledMenu = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  height: 100%;
  overflow-y: auto;
  background-color: ${themeGet('colors.primary')};

  ${width};
`;

const Menu = ({ children, ...props }) => (
  <StyledMenu {...props}>{children}</StyledMenu>
);

Menu.defaultProps = {
  width: '180px',
};

Menu.propTypes = {
  /**
   * The content of this Menu component
   */
  children: PropTypes.node.isRequired,
  /**
   * The width of this Menu component
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ...width.propTypes,
};

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
export { Item, SubMenu };
