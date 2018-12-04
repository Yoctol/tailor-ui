import React, { FunctionComponent, ReactNode } from 'react';

import { Types } from 'utils/getTypeIcon';

import BaseAlert from './BaseAlert';
import ClosableAlert from './ClosableAlert';

interface IAlertProps {
  closable?: boolean;
  message: ReactNode;
  type?: Types;
  onClose?: () => void;
  onClosed?: () => void;
}

const Alert: FunctionComponent<IAlertProps> = ({
  type = 'info',
  closable = false,
  ...props
}) => {
  const RenderComponent = closable ? ClosableAlert : BaseAlert;
  return <RenderComponent type={type} closable={closable} {...props} />;
};

export default Alert;
