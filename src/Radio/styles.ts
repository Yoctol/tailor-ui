import styled, { css } from 'styled-components';

import { Direction } from './RadioContext';

export const RadioWrapper = styled.span`
  display: inline-block;
  position: relative;
  margin-bottom: 1px;
  line-height: 1;
`;

export const RadioInner = styled.span`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  padding: 0;
  border: ${(p) => p.theme.borders.base};
  border-radius: 50%;
  border-color: ${(p) => p.theme.colors.gray400};
  background-color: ${(p) => p.theme.colors.light};
  color: ${(p) => p.theme.colors.gray700};

  ${(p) => p.theme.transition};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: 0;
    background-color: ${(p) => p.theme.colors.primary};
    transform: scale(0);
    ${(p) => p.theme.transition};
  }
`;

export const StyledRadio = styled.input.attrs({
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
    border-color: ${(p) => p.theme.colors.primary};
  }

  &:checked + ${RadioInner /* sc-selector */}::after {
    opacity: 1;
    transform: scale(1);
  }
`;

interface RadioLabelBaseProps {
  disabled?: boolean;
}

export const RadioLabelBase = styled.label<RadioLabelBaseProps>`
  display: inline-flex;
  align-items: center;
  font-size: ${(p) => p.theme.fontSizes.base};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};

  ${(p) =>
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

export const RadioLabel = styled(RadioLabelBase)<{ direction: Direction }>`
  /* stylelint-disable-next-line no-descending-specificity */
  & + ${RadioLabelBase /* sc-selector */} {
    ${
      ({ direction }) =>
        direction === 'horizontal' ? 'margin-left' : 'margin-top' /* sc-prop */
    }: ${(p) => p.theme.space[2]};
  }
`;

export const RadioGroupFlex = styled.div<{ direction: Direction }>`
  display: ${(p) => (p.direction === 'horizontal' ? 'flex' : 'inline-flex')};
  flex-direction: ${(p) => (p.direction === 'horizontal' ? 'row' : 'column')};
`;
