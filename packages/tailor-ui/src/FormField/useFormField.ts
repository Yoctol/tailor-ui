import { useContext, useEffect } from 'react';

import { tuplify } from '@tailor-ui/utils';

import FormFieldContext from './FormFieldContext';

const useFormField = ({
  id,
  value,
  defaultValue,
}: {
  id?: string;
  value: any;
  defaultValue: any;
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
    setValue(value || defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tuplify(invalid, id || labelId, setValue);
};

export { useFormField };
