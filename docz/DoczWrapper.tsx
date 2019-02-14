import React, { FunctionComponent, ReactNode } from 'react';

import UIProvider from '../src/UIProvider';

export interface WrapperProps {
  children: ReactNode;
}

const DoczWrapper: FunctionComponent<WrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
