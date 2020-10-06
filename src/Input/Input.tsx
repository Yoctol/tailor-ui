import React, {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { mergeEventProps } from '../utils';
import { useFormField } from '../FormField';

import { InputLabel, InputWrapper, Size, StyledInput } from './styles';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  autoSelect?: boolean;
  size?: Size;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    prefix,
    suffix,
    size = 'md',
    onPressEnter,
    onKeyPress,
    autoSelect,
    autoFocus,
    ...props
  },
  ref
) {
  const [invalid, labelId, setValue] = useFormField({
    id,
    value: props.value,
    defaultValue: props.defaultValue,
  });

  useEffect(() => {
    if (autoSelect && ref) {
      (ref as any).select();
    }
  }, [autoSelect, ref]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyPress) {
        onKeyPress(event);
      }

      if (onPressEnter && event.key === 'Enter') {
        onPressEnter(event);
      }
    },
    [onKeyPress, onPressEnter]
  );

  const input = useMemo(
    () => (
      <StyledInput
        ref={ref}
        id={labelId}
        invalid={invalid}
        size={size}
        onKeyPress={handleKeyPress}
        autoFocus={autoFocus || autoSelect}
        {...mergeEventProps(props, {
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value);
          },
        })}
      />
    ),
    [
      autoFocus,
      autoSelect,
      handleKeyPress,
      invalid,
      labelId,
      props,
      ref,
      setValue,
      size,
    ]
  );

  if (prefix || suffix) {
    return (
      <InputWrapper prefix={prefix} suffix={suffix}>
        {prefix && <InputLabel>{prefix}</InputLabel>}
        {input}
        {suffix &&
          (isValidElement(suffix) ? suffix : <InputLabel>{suffix}</InputLabel>)}
      </InputWrapper>
    );
  }

  return input;
});

export { Input };
