import React, { ChangeEvent, FunctionComponent, useContext } from 'react';
import styled, { css } from 'styled-components';

import tag from 'utils/CleanTag';

import Space from '../Grid/Space';

import RadioContext, { Direction } from './RadioContext';
import RadioGroup from './RadioGroup';

const RadioWrapper = styled.span`
  display: inline-block;
  position: relative;
  margin-bottom: 1px;
  line-height: 1;
`;

const RadioInner = styled.span`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  padding: 0;
  border: ${p => p.theme.borders.base};
  border-radius: 50%;
  border-color: ${p => p.theme.colors.gray400};
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray700};

  ${p => p.theme.transition};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: 0;
    background-color: ${p => p.theme.colors.primary};
    transform: scale(0);
    ${p => p.theme.transition};
  }
`;

const StyledRadio = styled.input.attrs({
  type: 'radio',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  &:checked + ${RadioInner /* sc-selector */} {
    border-color: ${p => p.theme.colors.primary};
  }

  &:checked + ${RadioInner /* sc-selector */}::after {
    opacity: 1;
    transform: scale(1);
  }
`;

const getMarginPosition = ({ direction }: { direction: Direction }) =>
  direction === 'horizontal' ? 'margin-left' : 'margin-top';

interface IRadioLabelBaseProps {
  disabled?: boolean;
}

const RadioLabelBase = styled(tag.label)<IRadioLabelBaseProps>`
  display: inline-flex;
  align-items: center;
  font-size: ${p => p.theme.fontSizes.base};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

  ${p =>
    p.disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover ${RadioInner /* sc-selector */} {
            border-color: ${p.theme.colors.primary};
          }
        `};
`;

const RadioLabel = styled(RadioLabelBase)`
  /* stylelint-disable-next-line no-descending-specificity */
  & + ${RadioLabelBase /* sc-selector */} {
    ${getMarginPosition /* sc-prop */}: ${p => p.theme.space[2]};
  }
`;

export interface IRadioProps {
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

const Radio: FunctionComponent<IRadioProps> & {
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
  const { _onChange, _isChecked, direction } = useContext(RadioContext);

  return (
    <RadioLabel disabled={disabled} direction={direction}>
      <RadioWrapper>
        <StyledRadio
          disabled={disabled}
          checked={_isChecked && value ? _isChecked(value) : checked}
          defaultChecked={defaultChecked}
          onChange={(event: ChangeEvent) => {
            if (onChange) {
              onChange(event);
            }
            if (_onChange && value) {
              _onChange(value);
            }
          }}
          {...props}
        />
        <RadioInner />
      </RadioWrapper>
      <Space px="2">{children}</Space>
    </RadioLabel>
  );
};

Radio.Group = RadioGroup;

export default Radio;
