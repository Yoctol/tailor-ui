import React, { SFC } from 'react';
import {
  BorderRadiusProps,
  BordersProps,
  SpaceProps,
  borderRadius,
  borders,
  space,
} from 'styled-system';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';

import Icon, { IconType } from '../Icon';

export type StyledItemProps = SpaceProps &
  BorderRadiusProps &
  BordersProps & {
    active?: boolean;
  };

export const StyledItem = styled<StyledItemProps, 'button'>(tag.button)`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 15px;
  border: 0;
  border-left: 8px solid;
  border-left-color: transparent;
  background-color: ${p => p.theme.colors.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: ${p => p.theme.fontSizes.base};
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      border-left-color: ${p => p.theme.colors.secondary};
      color: ${p => p.theme.colors.secondary};
    `};

  &:hover {
    border-left-color: ${p => p.theme.colors.secondary};
  }

  &:focus {
    outline: 0;
  }

  ${space};
  ${borders};
  ${borderRadius};
`;

export type ItemProps = StyledItemProps & {
  icon?: IconType;
  onClick?: () => void;
};

const Item: SFC<ItemProps> = ({
  children,
  icon,
  active = false,
  onClick,
  ...props
}) => (
  <StyledItem active={active} onClick={onClick} {...props}>
    {icon && (
      <Icon type={icon} mr="6px" fill={active ? 'secondary' : 'light'} />
    )}
    {children}
  </StyledItem>
);

export default Item;
