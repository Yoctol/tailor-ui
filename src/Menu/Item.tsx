import React, { FC } from 'react';

import { IconType } from '../Icon';

import { StyledItem, StyledItemBadge, StyledItemBox } from './styles';

export interface ItemProps {
  active?: boolean;
  icon?: IconType;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({
  children,
  active = false,
  onClick,
  ...props
}) => (
  <StyledItemBox active={active} onClick={onClick} {...props}>
    <StyledItem>
      <StyledItemBadge />
      {children}
    </StyledItem>
  </StyledItemBox>
);

export default Item;
