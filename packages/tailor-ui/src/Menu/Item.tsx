import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  BorderRadiusProps,
  BordersProps,
  SpaceProps,
  borderRadius,
  borders,
  space,
} from 'styled-system';

import Icon, { IconType } from '../Icon';
import tag from '../utils/CleanTag';

export type StyledItemProps = SpaceProps &
  BorderRadiusProps &
  BordersProps & {
    active?: boolean;
  };

export const StyledItem = styled(tag.button)<StyledItemProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 15px;
  border: 0;
  border-left: 8px solid;
  border-left-color: transparent;
  background-color: ${p => p.theme.colors.primaryDark2};
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
    background-color: ${p => p.theme.colors.primaryDark};
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

const Item: FunctionComponent<ItemProps> = ({
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
