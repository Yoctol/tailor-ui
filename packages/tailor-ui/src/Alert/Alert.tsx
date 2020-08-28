import React, { FC } from 'react';

import BaseAlert from './BaseAlert';
import ClosableAlert, { AlertProps } from './ClosableAlert';

const Alert: FC<AlertProps> = ({
  type = 'info',
  closable = false,
  ...props
}) => {
  const RenderComponent = closable ? ClosableAlert : BaseAlert;
  return <RenderComponent type={type} closable={closable} {...props} />;
};

export { Alert };
