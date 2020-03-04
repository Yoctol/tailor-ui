import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { ColorProps, color } from 'styled-system';

export const List = styled.div`
  max-height: 240px;
  padding: ${(p) => p.theme.space[2]} 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: ${(p) => p.theme.radii.lg};
`;

export const Item: StyledComponent<
  'li',
  DefaultTheme,
  {
    disabled: boolean;
  } & ColorProps,
  never
> = styled.li<{ disabled: boolean } & ColorProps>`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.heights.base};
  padding: 0 24px;
  background-color: ${(p) => p.theme.colors.light};
  font-size: ${(p) => p.theme.fontSizes.sm};
  cursor: pointer;

  &[disabled],
  &:disabled {
    color: ${(p) => p.theme.colors.gray500};
    cursor: not-allowed;

    :hover {
      background-color: ${(p) => p.theme.colors.light};
    }
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.gray200};
  }

  ${color};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${(p) => p.theme.space[1]} 0;
  background-color: ${(p) => p.theme.colors.gray300};
`;
