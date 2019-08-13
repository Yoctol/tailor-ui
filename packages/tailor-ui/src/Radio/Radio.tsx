import React, { ChangeEvent, FC, useContext, useMemo } from 'react';

import { Box } from '../Layout';
import { useFormField } from '../FormField';

import RadioGroup from './RadioGroup';
import { RadioContext } from './RadioContext';
import { RadioInner, RadioLabel, RadioWrapper, StyledRadio } from './styles';

export interface RadioProps {
  /**
   * Specifies whether the Radio is selected
   */
  checked?: boolean;
  /**
   * Specifies the initial state: whether or not the Radio is selected.
   */
  defaultChecked?: boolean;
  /**
   * Disable Radio
   */
  disabled?: boolean;
  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: (event: ChangeEvent) => void;
  value?: string;
}

const Radio: FC<RadioProps> & {
  Group: typeof RadioGroup;
} = ({
  children,
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  value,
  ...props
}) => {
  const { handleChange, isChecked, direction } = useContext(RadioContext);

  const inGroup = Boolean(handleChange);

  const boxChecked = useMemo(
    () => (isChecked && value ? isChecked(value) : checked),
    [checked, isChecked, value]
  );

  const [, , setValue] = useFormField({
    value: checked,
    defaultValue: defaultChecked,
  });

  return (
    <RadioLabel disabled={disabled} direction={direction}>
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
};

Radio.Group = RadioGroup;

export { Radio };
