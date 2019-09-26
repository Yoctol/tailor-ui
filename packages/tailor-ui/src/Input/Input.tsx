import React, {
  ChangeEvent,
  FC,
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

import { mergeEventProps } from '@tailor-ui/utils';

import { useFormField } from '../FormField';

import { InputLabel, InputWrapper, Size, StyledInput } from './styles';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /**
   * Auto select value of the input if true
   */
  autoSelect?: boolean;
  /**
   * The size of the input box
   */
  size?: Size;
  /**
   * The callback function that is triggered when Enter key is pressed
   */
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  /**
   * The label text displayed before (on the right side of) the input field.
   */
  prefix?: ReactNode;
  /**
   * The label text displayed after (on the right side of) the input field.
   */
  suffix?: ReactNode;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
};

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
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
  ) => {
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
            (isValidElement(suffix) ? (
              suffix
            ) : (
              <InputLabel>{suffix}</InputLabel>
            ))}
        </InputWrapper>
      );
    }

    return input;
  }
);

export { Input };
