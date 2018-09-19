import React, { SFC } from 'react';

import ThemeProvider from '../src/utils/ThemeProvider';

export interface WrapperProps {
  children: JSX.Element;
}

const DoczWrapper: SFC<WrapperProps> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export default DoczWrapper;
