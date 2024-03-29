import { createContext } from 'react';

const FormFieldContext = createContext<{
  invalid: boolean;
  labelId?: string;
  setValue: (value: any) => void;
  setLabelId: (id: string) => void;
}>({
  invalid: false,
  labelId: undefined,
  setValue: () => {},
  setLabelId: () => {},
});

FormFieldContext.displayName = 'FormFieldContext';

export default FormFieldContext;
