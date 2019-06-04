import React, { FunctionComponent, ReactNode } from 'react';

import { Icon, IconType } from '../Icon';

import { ButtonSize } from './styles';

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 24,
};

const iconMargins = {
  sm: '2px',
  md: '4px',
  lg: '8px',
};

const ButtonIcon: FunctionComponent<{
  loading: boolean;
  size: ButtonSize;
  icon?: IconType;
  buttonContent?: ReactNode;
}> = ({ loading, icon, size, buttonContent }) => {
  if (loading || !icon) {
    return null;
  }

  return (
    <Icon
      type={icon}
      size={iconSizes[size]}
      mr={buttonContent ? iconMargins[size] : 0}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ButtonIcon;
