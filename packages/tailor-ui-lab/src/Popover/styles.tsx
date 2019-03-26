import styled from 'styled-components';

export const StyledPopover = styled.div`
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.lg};
  border-color: ${p => p.theme.colors.gray300};
  background-color: ${p => p.theme.colors.light};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${p => p.theme.colors.gray700};
  font-size: ${p => p.theme.fontSizes.sm};
  text-align: left;
  white-space: nowrap;
`;

export const PopoverHeader = styled.div`
  padding: ${p => p.theme.space[1]} ${p => p.theme.space[2]};
  border-bottom: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.gray300};
`;

export const PopoverContent = styled.div`
  padding: ${p => p.theme.space[2]};
`;
