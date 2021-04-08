import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { useComposedRefs } from '@reach/utils/compose-refs';

import { mergeEventProps } from '../utils';
import { useFormField } from '../FormField';

import { InputLabel, InputWrapper, Size, StyledInput } from './styles';

export type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
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
  forwardedRef
) {
  const ownRef = useRef<HTMLInputElement>(null);
  const ref = useComposedRefs(forwardedRef, ownRef);
  const [invalid, labelId, setValue] = useFormField({
    id,
    value: props.value,
    defaultValue: props.defaultValue,
  });

  useLayoutEffect(() => {
    if (autoSelect) {
      ownRef.current?.select();
    }
  }, [autoSelect]);

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

  const input = (
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
