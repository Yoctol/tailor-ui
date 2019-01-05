import React, { FunctionComponent, ReactNode } from 'react';

import UIProvider from '../src/UIProvider';

export interface IWrapperProps {
  children: ReactNode;
}

const DoczWrapper: FunctionComponent<IWrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
