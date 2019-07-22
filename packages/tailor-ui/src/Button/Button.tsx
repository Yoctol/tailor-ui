import React, {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  forwardRef,
} from 'react';
import { SpaceProps, WidthProps } from 'styled-system';

import { IconType } from '../Icon';

import ButtonIcon from './ButtonIcon';
import { ButtonSize, ButtonVariant, StyledButton } from './styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SpaceProps &
  WidthProps & {
    loading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
    rounded?: boolean;
    disabled?: boolean;
    icon?: IconType;
  };

const Button: ForwardRefExoticComponent<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button(
  { children, icon, loading = false, size = 'md', ...props },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      hasIcon={Boolean(icon && !children)}
      size={size}
      isLoading={loading}
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

export { Button };
