import styled, { css, keyframes } from 'styled-components';

export const SelectWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

export interface StyledSelectOptionProps {
  active: boolean;
  hovered: boolean;
  disabled?: boolean;
}

export const StyledSelectOption = styled.div<StyledSelectOptionProps>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  background-color: ${(p) =>
    p.hovered ? p.theme.colors.primaryLight : p.theme.colors.light};
  color: ${(p) => {
    if (p.hovered) {
      return p.theme.colors.light;
    }
    if (p.active) {
      return p.theme.colors.primaryLight;
    }
    if (p.disabled) {
      return p.theme.colors.gray300;
    }
    return p.theme.colors.gray700;
  }};
  font-size: ${(p) => p.theme.fontSizes.sm};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`;

export const StyledSelectedOption = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-height: calc(${(p) => p.theme.heights.base} - 10px);
  margin-top: 2px;
  margin-right: 8px;
  margin-bottom: 2px;
  padding: 0 8px;
  border: ${(p) => p.theme.borders.base};
  border-radius: ${(p) => p.theme.radii.base};
  border-color: ${(p) => p.theme.colors.primaryLight};
  background-color: ${(p) => p.theme.colors.surface2};
  color: ${(p) => p.theme.colors.primaryLight};
  font-size: ${(p) => p.theme.fontSizes.sm};

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    fill: ${(p) => p.theme.colors.primaryLight2};
  }

  &:hover svg {
    fill: ${(p) => p.theme.colors.primaryLight};
  }
`;

export interface StyledSelectProps {
  focused: boolean;
  disabled: boolean;
  invalid: boolean;
  multiple: boolean;
}

export const StyledSelect = styled.div<StyledSelectProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-height: ${(p) => p.theme.heights.base};
  padding: ${(p) => (p.multiple ? '2px' : '4px')} ${(p) => p.theme.paddings.sm};
  border: ${(p) => p.theme.borders.base};
  border-radius: ${(p) => p.theme.radii.base};
  border-color: ${(p) => p.theme.colors.gray400};
  outline: none;
  background-color: ${(p) => p.theme.colors.light};
  color: ${(p) => p.theme.colors.gray700};
  line-height: ${(p) => p.theme.lineHeight};
  cursor: pointer;
  appearance: none;

  &:hover {
    border-color: ${(p) => p.theme.colors.primary};
  }

  ${(p) =>
    p.focused &&
    css`
      border-color: ${p.theme.colors.primary};
    `}

  ${(p) =>
    p.invalid &&
    css`
      border-color: ${p.theme.colors.danger} !important;
    `}

  ${(p) =>
    p.disabled &&
    css`
      border-color: ${p.theme.colors.gray400};
      background-color: ${p.theme.colors.gray300};
      cursor: not-allowed;

      &:hover {
        border-color: ${p.theme.colors.gray400};
      }

      input {
        color: ${p.theme.colors.gray500};
      }

      ${StyledSelectedOption} {
        border-color: ${p.theme.colors.gray400};
        background-color: ${p.theme.colors.gray200};
        color: ${p.theme.colors.gray400};
        pointer-events: none;
      }
    `}

  input {
    flex: 1;
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: ${(p) => p.theme.fontSizes.base};
    text-overflow: ellipsis;
    pointer-events: none;

    &::placeholder {
      color: ${(p) => p.theme.colors.gray400};
    }
  }

  ${(p) => p.theme.transition};
`;

export const StyledPopover = styled.div`
  position: relative;
  width: 100%;
  max-height: 182px;
  overflow-y: auto;
  border: ${(p) => p.theme.borders.base};
  border-radius: ${(p) => p.theme.radii.lg};
  border-color: ${(p) => p.theme.colors.gray300};
  box-shadow: ${(p) => p.theme.shadows.base};
  color: ${(p) => p.theme.colors.gray700};
  font-size: ${(p) => p.theme.fontSizes.sm};
  text-align: left;
  white-space: nowrap;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const SelectLoading = styled.div`
  flex: none;
  width: 16px;
  height: 16px;
  margin: 2px;
  border: ${(p) => p.theme.borders.base};
  border-radius: 50%;
  border-color: ${(p) => p.theme.colors.gray400};
  border-top-color: transparent;
  border-right-color: transparent;
  animation: ${spin} 0.7s linear infinite;
`;

export const ClearIconWrapper = styled.i`
  position: absolute;
  z-index: 1;
  width: 22px;
  height: 22px;
  padding: 1px;
  border-radius: 50%;
  opacity: 0;
  background-color: ${(p) => p.theme.colors.gray200};
  ${(p) => p.theme.transition};
`;

export const ArrowIconWrapper = styled.div<{ visible: boolean }>`
  width: 20px;
  height: 20px;
  margin: 1px;
  transform: rotate(${(p) => (p.visible ? 0 : 180)}deg);
  ${(p) => p.theme.transition};
`;

export const SelectSuffixWrapper = styled.div`
  display: inline-flex;
  position: relative;
  flex: none;
  width: 22px;
  height: 26px;
  padding: 2px 0;

  &:hover ${ClearIconWrapper} {
    opacity: 1;
  }
`;
