/* eslint-disable */
import React, { FunctionComponent, ReactNode } from 'react';
import { UIProvider } from '../packages/tailor-ui/src';

export interface WrapperProps {
  children: ReactNode;
}

const DoczWrapper: FunctionComponent<WrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
