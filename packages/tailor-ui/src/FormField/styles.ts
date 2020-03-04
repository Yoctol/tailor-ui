import styled, { css } from 'styled-components';

export const Label = styled.label<{ required: boolean }>`
  display: block;
  margin-bottom: 2px;
  padding-left: 2px;
  color: ${(p) => p.theme.colors.gray700};
  font-size: ${(p) => p.theme.fontSizes.sm};
  letter-spacing: 0.2px;

  ${(p) =>
    p.required &&
    css`
      &::after {
        content: '*';
        margin-left: ${p.theme.space[1]};
      }
    `}
`;

export const ValidationMessage = styled.div`
  margin-top: 2px;
  padding-left: 2px;
  color: ${(p) => p.theme.colors.danger};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;
