import ErrorIcon from 'react-icons/lib/md/error';
import InfoIcon from 'react-icons/lib/md/info';
import React from 'react';
import SuccessIcon from 'react-icons/lib/md/check-circle';
import WarningIcon from 'react-icons/lib/md/warning';

import Icon from '../Icon';

const icons = {
  info: <Icon size="20" mr={2} type={InfoIcon} fill="info" />,
  success: <Icon size="20" mr={2} type={SuccessIcon} fill="success" />,
  error: <Icon size="20" mr={2} type={ErrorIcon} fill="error" />,
  warning: <Icon size="20" mr={2} type={WarningIcon} fill="warning" />,
};

const getTypeIcon = (type = 'info') => icons[type];

export default getTypeIcon;
