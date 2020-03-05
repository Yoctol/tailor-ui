import styled from 'styled-components';

import { Box } from '../Layout';

export const StyledBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border: ${p => p.theme.borders.base};
  border-radius: ${p => p.theme.radii.base};
  font-size: 12px;
  line-height: 1;
`;

export const StyledBadgeWrapper = styled(Box)`
  display: inline-flex;
  position: relative;

  ${StyledBadge} {
    position: absolute;
    top: 0;
    right: 8px;
    transform: translateX(50%);
  }
`;
