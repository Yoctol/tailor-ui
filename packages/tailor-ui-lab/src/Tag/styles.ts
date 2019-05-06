import styled from 'styled-components';

export const StyledTag = styled.div<{
  editable: boolean;
  invalid: boolean;
}>`
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 8px;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.lg};
  border-color: ${p =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  background-color: ${p =>
    p.invalid ? p.theme.colors.light : p.theme.colors.surface2};
  color: ${p =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  font-size: ${p => p.theme.fontSizes.sm};
  white-space: nowrap;
  cursor: ${p => (p.editable ? 'pointer' : 'auto')};
`;

export const StyledTagPrefix = styled.span<{ invalid: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 100%;
  margin-right: 8px;
  padding-right: 8px;
  border-right: ${p => p.theme.borders.base};
  border-color: ${p =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  color: ${p =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  font-size: ${p => p.theme.fontSizes.sm};
`;

export const StyledTagInput = styled.input<{ invalid: boolean }>`
  display: inline-flex;
  max-width: 80px;
  border: none;
  outline: none;
  background-color: ${p =>
    p.invalid ? p.theme.colors.light : p.theme.colors.surface2};
  color: ${p =>
    p.invalid ? p.theme.colors.danger : p.theme.colors.primaryLight};
  font-size: ${p => p.theme.fontSizes.sm};
`;
