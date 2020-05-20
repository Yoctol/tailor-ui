import styled from 'styled-components';

import { Flex } from '../Layout';
import { Heading } from '../Typography';

export const StyledContainer = styled(Flex)`
  flex-direction: column;
  padding: 24px 32px 32px;
  border-radius: ${(p) => p.theme.radii.xl};
  background-color: ${(p) => p.theme.colors.light};
  box-shadow: ${(p) => p.theme.shadows.base};
  color: ${(p) => p.theme.colors.gray700};
  font-size: ${(p) => p.theme.fontSizes.base};

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

export const StyledSectionTitle = styled(Heading.H5)`
  margin-bottom: 12px;
`;
