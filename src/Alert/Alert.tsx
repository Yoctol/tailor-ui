import React, { FC } from 'react';

import { StatusType } from '../types';

import BaseAlert from './BaseAlert';
import ClosableAlert, {
  AlertProps as ClosableAlertProps,
} from './ClosableAlert';

type AlertProps = Omit<ClosableAlertProps, 'type' | 'closable'> & {
  type?: StatusType;
  closable?: boolean;
};

const Alert: FC<AlertProps> = ({
  type = 'info',
  closable = false,
  ...props
}) => {
  const RenderComponent = closable ? ClosableAlert : BaseAlert;
  return <RenderComponent type={type} closable={closable} {...props} />;
};

export { Alert };
