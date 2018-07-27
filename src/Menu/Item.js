import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, borders, color, space, themeGet } from 'styled-system';
import { ifProp } from 'styled-tools';

import Icon from '../Icon';

export const StyledItem = styled.button`
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
  /**
   * Decide the Item component is active or not
   */
  active: PropTypes.bool,
  /**
   * The content inside this Item component
   */
  children: PropTypes.node.isRequired,
  /**
   * The icon component before children component
   */
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

export default Item;
