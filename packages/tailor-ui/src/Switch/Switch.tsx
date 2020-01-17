import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.label`
  display: inline-flex;
  position: relative;
  width: 40px;
  height: 20px;

  & input {
    display: none;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 99px;
    background-color: ${p => p.theme.colors.gray400};
    transition: 0.4s;
    cursor: pointer;
  }

  span::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + span {
    background-color: ${p => p.theme.colors.primary};
  }

  input:checked + span::before {
    transform: translateX(20px);
  }

  input:disabled + span {
    opacity: 0.4;
  }

  input:disabled + span::before {
    opacity: 0.4;
  }
`;

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLLabelElement, SwitchProps>(function Switch(
  { onChange, disabled = false, ...props },
  ref
) {
  return (
    <StyledSwitch ref={ref}>
      <input
        type="checkbox"
        onChange={({ target }) => {
          if (onChange) {
            onChange(target.checked);
          }
        }}
        disabled={disabled}
        {...props}
      />
      <span />
    </StyledSwitch>
  );
});

export { Switch };
