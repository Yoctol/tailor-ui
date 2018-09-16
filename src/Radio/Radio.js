import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import Space from '../Grid/Space';

import { Consumer } from './RadioContext';

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
  border-color: ${p => p.theme.colors.gray[7]};
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray[3]};

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

const getMarginPosition = p =>
  p.direction === 'horizontal' ? 'margin-left' : 'margin-top';

const RadioLabelBase = styled.label`
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

const Radio = ({
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
      <RadioLabel disabled={disabled} direction={direction} {...props}>
        <RadioWrapper>
          <StyledRadio
            disabled={disabled}
            checked={_isChecked ? _isChecked(value) : checked}
            defaultChecked={defaultChecked}
            onChange={event => {
              onChange(event);
              if (_onChange) _onChange(value);
            }}
          />
          <RadioInner />
        </RadioWrapper>
        <Space px="2">{children}</Space>
      </RadioLabel>
    )}
  </Consumer>
);

Radio.propTypes = {
  /**
   * Specifies whether the Radio is selected
   */
  // eslint-disable-next-line react/require-default-props
  checked: PropTypes.bool,
  /**
   * Specifies the initial state: whether or not the Radio is selected.
   */
  // eslint-disable-next-line react/require-default-props
  defaultChecked: PropTypes.bool,
  /**
   * Disable Radio
   */
  disabled: PropTypes.bool,
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default Radio;
