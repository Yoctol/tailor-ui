import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.label`
  display: inline-block;
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
  /**
   * determine whether the Switch is checked
   */
  checked?: boolean;
  /**
   * to set the initial state
   */
  defaultChecked?: boolean;
  /**
   * Disable switch
   */
  disabled?: boolean;
  /**
   * a callback function, can be executed when the checked state is changing
   */
  onChange?: (checked: boolean) => void;
}

const Switch: FunctionComponent<SwitchProps> = ({
  defaultChecked,
  checked,
  onChange,
  disabled,
  ...props
}) => (
  <StyledSwitch>
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      checked={checked}
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

Switch.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default Switch;
