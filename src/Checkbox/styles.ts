import styled, { css } from 'styled-components';

import { Direction } from './CheckboxContext';

export const CheckboxWrapper = styled.span`
  display: inline-block;
  position: relative;
  margin-bottom: 1px;
  line-height: 1;
`;

export const CheckboxInner = styled.span`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  padding: 0;
  border: ${(p) => p.theme.borders.base};
  border-radius: 2px;
  border-color: ${(p) => p.theme.colors.gray400};
  background-color: ${(p) => p.theme.colors.light};
  color: ${(p) => p.theme.colors.gray700};

  ${(p) => p.theme.transition};

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
    ${(p) => p.theme.transition};
  }
`;

export const StyledCheckbox = styled.input.attrs({
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
    border-color: ${(p) => p.theme.colors.primary};
    background-color: ${(p) => p.theme.colors.primary};
  }

  &:checked + ${CheckboxInner /* sc-selector */}::after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
`;

interface RadioLabelBaseProps {
  disabled: boolean;
  direction: Direction;
}

export const CheckboxLabelBase = styled.label<RadioLabelBaseProps>`
  display: inline-flex;
  align-items: center;
  font-size: ${(p) => p.theme.fontSizes.base};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};

  & + & {
    ${
      ({ direction }) =>
        direction === 'horizontal' ? 'margin-left' : 'margin-top' /* sc-prop */
    }: ${(p) => p.theme.space[2]};
  }

  ${(p) =>
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

export const CheckboxLabel = styled(CheckboxLabelBase)<{
  direction: Direction;
}>`
  /* stylelint-disable-next-line no-descending-specificity */
  & + ${CheckboxLabelBase /* sc-selector */} {
    ${
      ({ direction }) =>
        direction === 'horizontal' ? 'margin-left' : 'margin-top' /* sc-prop */
    }: ${(p) => p.theme.space[2]};
  }
`;

export const CheckboxGroupFlex = styled.div<{ direction: Direction }>`
  display: ${(p) => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${(p) => (p.direction === 'horizontal' ? 'row' : 'column')};
`;
