import React from 'react';
import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md';

import Icon from '../Icon';

export type Types = 'info' | 'success' | 'error' | 'warning';

const icons = {
  info: MdInfo,
  success: MdCheckCircle,
  error: MdError,
  warning: MdWarning,
};

const getTypeIcon = (type: Types = 'info', size: string | number = '20') => {
  const MdIcon = icons[type];
  return <Icon size={size} type={MdIcon} mr={2} fill={type} />;
};

export default getTypeIcon;
