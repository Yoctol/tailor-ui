import React, { ChangeEvent, PureComponent } from 'react';

import styled, { css } from 'utils/styled-components';

import Space from '../Grid/Space';

import CheckboxGroup from './CheckboxGroup';
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
  border: ${p => p.theme.borders.base};
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

export type Direction = 'horizontal' | 'verticle';

const getMarginPosition = ({ direction }: { direction: Direction }) =>
  direction === 'horizontal' ? 'margin-left' : 'margin-top';

type RadioLabelBaseProps = {
  disabled: boolean;
};

const CheckboxLabelBase = styled<RadioLabelBaseProps, 'label'>('label')`
  display: inline-flex;
  align-items: center;
  font-size: ${p => p.theme.fontSizes.base};
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
  onChange?: (evnet: ChangeEvent) => void;
  value?: string;
}

class Checkbox extends PureComponent<CheckboxProps> {
  static Group = CheckboxGroup;

  render() {
    const {
      children,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      value,
      ...props
    } = this.props;
    return (
      <Consumer>
        {({ _onChange, _isChecked, direction }) => (
          <CheckboxLabel disabled={disabled} direction={direction} {...props}>
            <CheckboxWrapper>
              <StyledCheckbox
                disabled={disabled}
                checked={_isChecked && value ? _isChecked(value) : checked}
                defaultChecked={defaultChecked}
                onChange={event => {
                  if (onChange) {
                    onChange(event);
                  }
                  if (_onChange && value) {
                    _onChange(event, value);
                  }
                }}
              />
              <CheckboxInner />
            </CheckboxWrapper>
            <Space px="2">{children}</Space>
          </CheckboxLabel>
        )}
      </Consumer>
    );
  }
}

export default Checkbox;
