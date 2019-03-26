import React, { MouseEventHandler, ReactNode, forwardRef } from 'react';

import { IconType } from '../Icon';

import ButtonIcon from './ButtonIcon';
import { StyledButton, StyledButtonProps } from './styles';

export type ButtonProps = StyledButtonProps & {
  icon?: IconType;
  onClick?: MouseEventHandler;
  children?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, icon, loading = false, size = 'md', ...props },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      hasIcon={Boolean(icon && !children)}
      size={size}
      loading={loading}
      {...props}
    >
      <ButtonIcon
        icon={icon}
        loading={loading}
        size={size}
        buttonContent={children}
      />
      {children}
    </StyledButton>
  );
});

export default Button;
