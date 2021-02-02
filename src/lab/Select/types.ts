import { ReactNode } from 'react';

export type SelectOptionObject = {
  label: string;
  value: string;
  disabled?: boolean;
  hint?: ReactNode;
};

export type SelectCreateOptionObject = {
  label: 'CREATE_OPTION';
  value: string;
};

export type SelectOption = SelectOptionObject | string | number;

export type SelectValue = SelectOption | null;
