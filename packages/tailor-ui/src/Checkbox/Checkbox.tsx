import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useContext,
  useMemo,
} from 'react';

import { Box } from '../Layout';
import { useFormField } from '../FormField';

import { CheckboxContext } from './CheckboxContext';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';
import {
  CheckboxInner,
  CheckboxLabel,
  CheckboxWrapper,
  StyledCheckbox,
} from './styles';

export type CheckboxGroupProps = CheckboxGroupProps;

export interface CheckboxProps {
  /**
   * Specifies whether the checkbox is selected
   */
  checked?: boolean;
  /**
   * Specifies the initial state: whether or not the checkbox is selected.
   */
  defaultChecked?: boolean;
  /**
   * Disable Checkbox
   */
  disabled?: boolean;
  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * The value of checkbox
   */
  value?: string;
  id?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> & {
  Group: typeof CheckboxGroup;
} = ({
  children,
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  value,
  id,
  ...props
}) => {
  const { handleChange, isChecked, direction } = useContext(CheckboxContext);

  const inGroup = Boolean(handleChange);

  const boxChecked = useMemo(
    () => (isChecked && value ? isChecked(value) : checked),
    [checked, isChecked, value]
  );

  const [, labelId, setValue] = useFormField({
    id,
    value: checked,
    defaultValue: defaultChecked,
  });

  return (
    <CheckboxLabel disabled={disabled} direction={direction}>
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
};

Checkbox.Group = CheckboxGroup;

export { Checkbox };
