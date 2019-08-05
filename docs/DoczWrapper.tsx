/* eslint-disable */
import React, { FC, ReactNode } from 'react';
import { UIProvider } from '../packages/tailor-ui/src';

export interface WrapperProps {
  children: ReactNode;
}

const DoczWrapper: FC<WrapperProps> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default DoczWrapper;
