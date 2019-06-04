import React, { FunctionComponent, ReactNode } from 'react';

import { Types } from '../utils/getTypeIcon';

import BaseAlert from './BaseAlert';
import ClosableAlert from './ClosableAlert';

interface AlertProps {
  closable?: boolean;
  message: ReactNode;
  type?: Types;
  onClose?: () => void;
  onClosed?: () => void;
}

const defaultType = 'info';

const Alert: FunctionComponent<AlertProps> = ({
  type = defaultType as Types,
  closable = false,
  ...props
}) => {
  const RenderComponent = closable ? ClosableAlert : BaseAlert;
  return <RenderComponent type={type} closable={closable} {...props} />;
};

export { Alert };
