import React, { FunctionComponent, MouseEventHandler } from 'react';

import { IconType } from '../Icon';

import ButtonIcon from './ButtonIcon';
import { StyledButton, StyledButtonProps } from './styles';

export type ButtonProps = StyledButtonProps & {
  icon?: IconType;
  onClick?: MouseEventHandler;
};

const Button: FunctionComponent<ButtonProps> = ({
  children,
  icon,
  loading = false,
  size = 'md',
  ...props
}) => (
  <StyledButton
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

export default Button;
