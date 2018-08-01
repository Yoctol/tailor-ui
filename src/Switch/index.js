import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Toggle } from 'react-powerplug';
import { space, themeGet } from 'styled-system';

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
    background-color: ${themeGet('colors.gray.7')};
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
    background-color: ${themeGet('colors.primary')};
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

  ${space};
`;

const Switch = ({ defaultChecked, checked, onChange, disabled }) => (
  <Toggle initial={defaultChecked} onChange={onChange}>
    {({ on, toggle }) => (
      <StyledSwitch>
        <input
          type="checkbox"
          checked={on || checked}
          onChange={toggle}
          disabled={disabled}
        />
        <span />
      </StyledSwitch>
    )}
  </Toggle>
);

Switch.propTypes = {
  /**
   * determine whether the Switch is checked
   */
  checked: PropTypes.bool,
  /**
   * to set the initial state
   */
  defaultChecked: PropTypes.bool,
  /**
   * Disable switch
   */
  disabled: PropTypes.bool,
  /**
   * a callback function, can be executed when the checked state is changing
   */
  onChange: PropTypes.func,
  ...space.propTypes,
};

Switch.defaultProps = {
  defaultChecked: false,
  checked: false,
  disabled: false,
  onChange: () => {},
};

export default Switch;
