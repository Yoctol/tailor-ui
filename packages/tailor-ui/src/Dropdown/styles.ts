import styled from 'styled-components';
import { color } from 'styled-system';

export const List = styled.div`
  max-height: 240px;
  padding: ${p => p.theme.space[2]} 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: ${p => p.theme.radii.lg};
`;

export const Item = styled.li<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  height: ${p => p.theme.heights.base};
  padding: 0 24px;
  background-color: ${p => p.theme.colors.light};
  font-size: ${p => p.theme.fontSizes.sm};
  cursor: pointer;

  &[disabled],
  &:disabled {
    color: ${p => p.theme.colors.gray500};
    cursor: not-allowed;

    :hover {
      background-color: ${p => p.theme.colors.light};
    }
  }

  &:hover {
    background-color: ${p => p.theme.colors.gray200};
  }

  ${color};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${p => p.theme.space[1]} 0;
  background-color: ${p => p.theme.colors.gray300};
`;
