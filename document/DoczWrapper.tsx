/* eslint-disable */
import React, { FunctionComponent, ReactNode } from 'react';
import { UIProvider } from 'tailor-ui';

export interface WrapperProps {
  children: ReactNode;
}

const DoczWrapper: FunctionComponent<WrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
