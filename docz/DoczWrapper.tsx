import React, { FunctionComponent } from 'react';

import UIProvider from '../src/UIProvider';

export interface IWrapperProps {
  children: JSX.Element;
}

const DoczWrapper: FunctionComponent<IWrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
