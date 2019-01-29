import React, { FunctionComponent, useContext } from 'react';

import Box from '../Grid/Box';
import Icon from '../Icon';

import MenuContenx from './MenuContext';
import { StyledMenuItem } from './styles';

const MenuItem: FunctionComponent<any> = ({
  id,
  icon,
  children,
  onClick,
  ...props
}) => {
  const { activeItemId, setActiveItemId } = useContext(MenuContenx);

  const active = activeItemId === id;

  return (
    <StyledMenuItem
      active={active}
      onClick={(event: MouseEvent) => {
        setActiveItemId(id);
        if (onClick) {
          onClick(event);
        }
      }}
      {...props}
    >
      <Box flex="auto">{children}</Box>
      {icon && (
        <Icon
          ml="2"
          size="16"
          type={icon}
          fill={active ? 'secondaryLight' : 'light'}
        />
      )}
    </StyledMenuItem>
  );
};

export default MenuItem;
