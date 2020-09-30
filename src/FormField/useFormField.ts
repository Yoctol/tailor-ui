import { useContext, useEffect } from 'react';

import { tuplify } from '../utils';

import FormFieldContext from './FormFieldContext';

const useFormField = ({
  id,
  value,
  defaultValue,
}: {
  id?: string;
  value?: any;
  defaultValue?: any;
}) => {
  const { invalid, setValue, setLabelId, labelId } = useContext(
    FormFieldContext
  );

  useEffect(() => {
    if (id) {
      setLabelId(id);
    }
  }, [id, setLabelId]);

  useEffect(() => {
    const fieldValue = value || defaultValue;

    if (fieldValue) {
      setValue(fieldValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tuplify(invalid, id || labelId, setValue);
};

export { useFormField };
