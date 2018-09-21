import React, { SFC } from 'react';

import UIProvider from '../src/UIProvider';

export interface WrapperProps {
  children: JSX.Element;
}

const DoczWrapper: SFC<WrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
