import styled from 'styled-components';

import { AutoSizeInput } from '../AutoSizeInput';

export interface StyledTagProps {
  editable: boolean;
  invalid: boolean;
  disabled: boolean;
}

export const StyledTag = styled.div<StyledTagProps>`
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 8px;
  border: ${(p) => p.theme.borders.base};
  border-radius: ${(p) => p.theme.radii.lg};
  border-color: ${(p) => {
    if (p.disabled) {
      return p.theme.colors.gray500;
    }
    if (p.invalid) {
      return p.theme.colors.danger;
    }

    return p.theme.colors.primaryLight;
  }};
  background-color: ${(p) => {
    if (p.disabled) {
      return p.theme.colors.gray300;
    }
    if (p.invalid) {
      return p.theme.colors.light;
    }

    return p.theme.colors.surface2;
  }};
  color: ${(p) => {
    if (p.disabled) {
      return p.theme.colors.gray500;
    }
    if (p.invalid) {
      return p.theme.colors.danger;
    }

    return p.theme.colors.primaryLight;
  }};
  font-size: ${(p) => p.theme.fontSizes.sm};
  white-space: nowrap;
  cursor: ${(p) => {
    if (p.disabled) {
      return 'not-allowed';
    }
    if (p.editable || Boolean(p.onClick)) {
      return 'pointer';
    }

    return 'auto';
  }};

  input {
    color: ${(p) =>
      p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  }
`;

export const StyledTagPrefix = styled.span<{ invalid: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 100%;
  margin-right: 8px;
  padding-right: 8px;
  border-right: ${(p) => p.theme.borders.base};
  border-color: ${(p) =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  color: ${(p) =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;

export const StyledTagInput = styled(AutoSizeInput)`
  display: inline-flex;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: ${(p) => p.theme.fontSizes.sm};
`;
