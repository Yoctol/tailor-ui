import ErrorIcon from 'react-icons/lib/md/error';
import InfoIcon from 'react-icons/lib/md/info';
import React from 'react';
import SuccessIcon from 'react-icons/lib/md/check-circle';
import WarningIcon from 'react-icons/lib/md/warning';

import Icon from '../Icon';

const icons = {
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
};

const getTypeIcon = (type = 'info', size = '20') => {
  const MdIcon = icons[type];
  return <Icon size={size} type={MdIcon} mr={2} fill={type} />;
};

export default getTypeIcon;
