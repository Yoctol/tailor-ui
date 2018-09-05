import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import Space from '../Grid/Space';

import { Consumer } from './CheckboxContext';

const CheckboxWrapper = styled.span`
  display: inline-block;
  position: relative;
  margin-bottom: 1px;
  line-height: 1;
`;

const CheckboxInner = styled.span`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  padding: 0;
  border: ${p => p.theme.borders.default};
  border-radius: 2px;
  border-color: ${p => p.theme.colors.gray[7]};
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray[3]};

  ${p => p.theme.transition};

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    opacity: 0;
    transform: rotate(45deg) scale(0);
    ${p => p.theme.transition};
  }
`;

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  &:checked + ${CheckboxInner /* sc-selector */} {
    border-color: ${p => p.theme.colors.primary};
    background-color: ${p => p.theme.colors.primary};
  }

  &:checked + ${CheckboxInner /* sc-selector */}::after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
`;

const getMarginPosition = p =>
  p.direction === 'horizontal' ? 'margin-left' : 'margin-top';

const CheckboxLabelBase = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

  & + & {
    ${getMarginPosition /* sc-prop */}: ${p => p.theme.space[2]};
  }

  ${p =>
    p.disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover ${CheckboxInner /* sc-selector */} {
            border-color: ${p.theme.colors.primary};
          }
        `};
`;

const CheckboxLabel = styled(CheckboxLabelBase)`
  /* stylelint-disable-next-line no-descending-specificity */
  & + ${CheckboxLabelBase /* sc-selector */} {
    ${getMarginPosition /* sc-prop */}: ${p => p.theme.space[2]};
  }
`;

const Checkbox = ({
  children,
  disabled,
  checked,
  defaultChecked,
  onChange,
  value,
  ...props
}) => (
  <Consumer>
    {({ _onChange, _isChecked, direction }) => (
      <CheckboxLabel disabled={disabled} direction={direction} {...props}>
        <CheckboxWrapper>
          <StyledCheckbox
            disabled={disabled}
            checked={_isChecked ? _isChecked(value) : checked}
            defaultChecked={defaultChecked}
            onChange={event => {
              onChange(event);
              if (_onChange) _onChange(event, value);
            }}
          />
          <CheckboxInner />
        </CheckboxWrapper>
        <Space px="2">{children}</Space>
      </CheckboxLabel>
    )}
  </Consumer>
);

Checkbox.propTypes = {
  /**
   * Specifies whether the checkbox is selected
   */
  // eslint-disable-next-line react/require-default-props
  checked: PropTypes.bool,
  /**
   * Specifies the initial state: whether or not the checkbox is selected.
   */
  // eslint-disable-next-line react/require-default-props
  defaultChecked: PropTypes.bool,
  /**
   * Disable checkbox
   */
  disabled: PropTypes.bool,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default Checkbox;