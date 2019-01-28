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

const defaultType: string = 'info';

const Alert: FunctionComponent<IAlertProps> = ({
  type = defaultType as Types,
  closable = false,
  ...props
}) => {
  const RenderComponent = closable ? ClosableAlert : BaseAlert;
  return <RenderComponent type={type} closable={closable} {...props} />;
};

export default Alert;
