import { useCallback, useMemo, useState } from 'react';

import { tuplify } from '@tailor-ui/utils';

interface UseOwnValueProps<V> {
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
}

interface UseOwnValueOptions<V> {
  fallbackValue: V;
}

const useOwnValue = <V>(
  props: UseOwnValueProps<V>,
  options: UseOwnValueOptions<V>
) => {
  const [ownValue, setOwnValue] = useState(
    () => props.value || props.defaultValue || options.fallbackValue
  );

  const value = useMemo(
    () => (props.value !== undefined ? props.value : ownValue),
    [ownValue, props.value]
  );

  const onChange = useCallback(
    (newValue: V) => {
      setOwnValue(newValue);

      if (props.onChange) {
        props.onChange(newValue);
      }
    },
    [props]
  );

  return tuplify(value, onChange);
};

export { useOwnValue };
