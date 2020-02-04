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

import { CheckboxContext } from './CheckboxContext';
import {
  CheckboxInner,
  CheckboxLabel,
  CheckboxWrapper,
  StyledCheckbox,
} from './styles';

export interface CheckboxProps {
  children?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  id?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>;
}

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(function Checkbox(
  {
    children,
    disabled = false,
    checked,
    defaultChecked,
    onChange,
    value,
    id,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref
) {
  const { handleChange, isChecked, direction } = useContext(CheckboxContext);
  const [, labelId, setValue] = useFormField({
    id,
    value: checked,
    defaultValue: defaultChecked,
  });

  const inGroup = Boolean(handleChange);
  const boxChecked = isChecked && value ? isChecked(value) : checked;

  return (
    <CheckboxLabel
      ref={ref}
      disabled={disabled}
      direction={direction}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CheckboxWrapper>
        <StyledCheckbox
          id={inGroup ? undefined : labelId}
          disabled={disabled}
          checked={boxChecked}
          defaultChecked={defaultChecked}
          onChange={event => {
            if (onChange) {
              onChange(event);
            }
            if (handleChange && value) {
              handleChange(event, value);
            }
            if (!inGroup) {
              setValue(event.target.checked);
            }
          }}
          {...props}
        />
        <CheckboxInner />
      </CheckboxWrapper>
      <Box px="2">{children}</Box>
    </CheckboxLabel>
  );
});

export { Checkbox };
