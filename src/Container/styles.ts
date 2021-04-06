import styled from 'styled-components';

import { Flex } from '../Layout';
import { StyledTableWrapper } from '../Table/styles';

export const StyledContainer = styled(Flex)`
  flex-direction: column;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radii.xl};
  background-color: ${(p) => p.theme.colors.light};
  box-shadow: ${(p) => p.theme.shadows.base};
  color: ${(p) => p.theme.colors.gray700};
  font-size: ${(p) => p.theme.fontSizes.base};

  ${StyledTableWrapper} {
    width: 100%;
    border-top: ${(p) => p.theme.borders.base};
    border-bottom: ${(p) => p.theme.borders.base};
    border-radius: 0;
    border-color: ${(p) => p.theme.colors.gray300};
    box-shadow: none;
  }

  & + & {
    margin-top: 16px;
  }
`;

export const StyledSection = styled(Flex)`
  flex-direction: column;

  & + & {
    margin-top: 32px;
  }
`;
