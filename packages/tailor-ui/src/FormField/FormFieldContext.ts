import { createContext } from 'react';

export type Value = number | string | object | boolean | null;

const FormFieldContext = createContext<{
  invalid: boolean;
  labelId?: string;
  setValue: (value: Value) => void;
  setLabelId: (id: string) => void;
}>({
  invalid: false,
  labelId: undefined,
  setValue: () => {},
  setLabelId: () => {},
});

export default FormFieldContext;
