import { useCallback, useMemo, useState } from 'react';

interface UseOwnValueProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
}

interface UseOwnValueOptions {
  fallbackValue: any;
}

const useOwnValue = (props: UseOwnValueProps, options: UseOwnValueOptions) => {
  const [ownValue, setOwnValue] = useState(
    () => props.value || props.defaultValue || options.fallbackValue
  );

  const hasValueProps = useMemo(() => props.value !== undefined, [props.value]);
  const value = useMemo(() => (hasValueProps ? props.value : ownValue), [
    hasValueProps,
    ownValue,
    props.value,
  ]);

  const onChange = useCallback(
    (newValue: any) => {
      setOwnValue(newValue);

      if (props.onChange) {
        props.onChange(newValue);
      }
    },
    [props]
  );

  return [value, onChange];
};

export { useOwnValue };
