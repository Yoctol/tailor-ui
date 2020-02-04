import React, {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useContext,
} from 'react';

import { Box } from '../Layout';
import { useFormField } from '../FormField';

import { RadioContext } from './RadioContext';
import { RadioInner, RadioLabel, RadioWrapper, StyledRadio } from './styles';

export interface RadioProps {
  children?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>;
}

const Radio = forwardRef<HTMLLabelElement, RadioProps>(function Radio(
  {
    children,
    disabled = false,
    checked,
    defaultChecked,
    onChange,
    value,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref
) {
  const { handleChange, isChecked, direction } = useContext(RadioContext);
  const [, , setValue] = useFormField({
    value: checked,
    defaultValue: defaultChecked,
  });

  const inGroup = Boolean(handleChange);
  const boxChecked = isChecked && value ? isChecked(value) : checked;

  return (
    <RadioLabel
      ref={ref}
      disabled={disabled}
      direction={direction}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RadioWrapper>
        <StyledRadio
          disabled={disabled}
          checked={boxChecked}
          defaultChecked={defaultChecked}
          onChange={event => {
            if (onChange) {
              onChange(event);
            }
            if (handleChange && value) {
              handleChange(value);
            }
            if (!inGroup) {
              setValue(event.target.checked);
            }
          }}
          {...props}
        />
        <RadioInner />
      </RadioWrapper>
      <Box px="2">{children}</Box>
    </RadioLabel>
  );
});

export { Radio };
