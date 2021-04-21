import React, { ComponentPropsWithRef, FC } from 'react';
import { to, useTransition } from '@react-spring/web';

import { AnimatedStyledBadge, StyledBadgeWrapper } from './styles';

type StyledBadgeProps = ComponentPropsWithRef<typeof AnimatedStyledBadge>;

export type BadgeProps = StyledBadgeProps & {
  count?: number;
  showZero?: boolean;
  overflowCount?: number;
  wrapperProps?: ComponentPropsWithRef<typeof StyledBadgeWrapper>;
};

const Badge: FC<BadgeProps> = ({
  count,
  overflowCount = 99,
  showZero = false,
  wrapperProps,
  children,
  color = 'light',
  bg = 'danger',
  borderColor = 'light',
  ...otherProps
}) => {
  const displayCount =
    count && count > overflowCount ? `${overflowCount}+` : count;
  const transition = useTransition(showZero || count !== 0, {
    from: {
      opacity: 0,
      transform: 'scale(0.6)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.6)',
    },
  });

  const badge = transition(
    (style, item) =>
      item && (
        <AnimatedStyledBadge
          color={color}
          bg={bg}
          borderColor={borderColor}
          {...otherProps}
          style={{
            opacity: style.opacity,
            transformOrigin: children ? 'right' : 'center',
            transform: to(style.transform, (x) =>
              children ? `${x} translateX(50%)` : x
            ),
          }}
        >
          {displayCount}
        </AnimatedStyledBadge>
      )
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
