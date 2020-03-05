import React, { ComponentPropsWithRef, FC } from 'react';

import { StyledBadge, StyledBadgeWrapper } from './styles';

type StyledBadgeProps = ComponentPropsWithRef<typeof StyledBadge>;

export type BadgeProps = StyledBadgeProps & {
  count?: number;
  overflowCount?: number;
  wrapperProps?: ComponentPropsWithRef<typeof StyledBadgeWrapper>;
};

const Badge: FC<BadgeProps> = ({
  count,
  overflowCount = 99,
  wrapperProps,
  children,
  color = 'light',
  bg = 'danger',
  borderColor = 'light',
  ...props
}) => {
  const displayCount =
    count && count > overflowCount ? `${overflowCount}+` : count;

  const badge = (
    <StyledBadge color={color} bg={bg} borderColor={borderColor} {...props}>
      {displayCount}
    </StyledBadge>
  );

  if (!children) {
    return badge;
  }

  return (
    <StyledBadgeWrapper {...wrapperProps}>
      {children}
      {badge}
    </StyledBadgeWrapper>
  );
};

export { Badge };
