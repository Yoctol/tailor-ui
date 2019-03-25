import React from 'react';

import Icon from '../Icon';

export type Types = 'info' | 'success' | 'error' | 'warning';

const icons = {
  info: 'info',
  success: 'success',
  error: 'danger',
  warning: 'warning',
};

const getTypeIcon = (type: Types = 'info', size: string | number = '20') => {
  const iconType = icons[type];
  return <Icon size={size} type={iconType as any} mr="2" fill={type} />;
};

export default getTypeIcon;
