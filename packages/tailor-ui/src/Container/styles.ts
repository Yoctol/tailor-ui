import styled from 'styled-components';

import { Heading } from '../Typography';

export const StyledContainer = styled.article`
  padding: 24px 32px 32px;
  border-radius: ${p => p.theme.radii.xl};
  background-color: ${p => p.theme.colors.light};
  box-shadow: 0 2px 4px 0 #cbd1e0;
  color: ${p => p.theme.colors.gray700};
  font-size: ${p => p.theme.fontSizes.base};

  & + & {
    margin-top: 16px;
  }
`;

export const StyledContainerTitle = styled(Heading.h4)`
  margin-bottom: 24px;
  padding-bottom: 8px;
  border-bottom: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.gray300};
`;

export const StyledSection = styled.section`
  & + & {
    margin-top: 32px;
  }
`;

export const StyledSectionTitle = styled(Heading.h5)`
  margin-bottom: 12px;
`;
