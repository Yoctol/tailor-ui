import React, { FC, ReactNode } from 'react';

import { StatusType } from '../types';

import BaseAlert from './BaseAlert';
import ClosableAlert from './ClosableAlert';

interface AlertProps {
  closable?: boolean;
  message: ReactNode;
  type?: StatusType;
  onClose?: () => void;
  onClosed?: () => void;
}

const Alert: FC<AlertProps> = ({
  type = 'info',
  closable = false,
  ...props
}) => {
  const RenderComponent = closable ? ClosableAlert : BaseAlert;
  return <RenderComponent type={type} closable={closable} {...props} />;
};

export { Alert };
