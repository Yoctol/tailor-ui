import styled from 'styled-components';
import { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react';
import { animated } from 'react-spring';

import { Box } from '../Layout';

const StyledBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border: ${(p) => p.theme.borders.base};
  border-radius: ${(p) => p.theme.radii.base};
  font-size: 12px;
  line-height: 1;
`;

export const AnimatedStyledBadge: ForwardRefExoticComponent<ComponentPropsWithRef<
  typeof StyledBadge
>> = animated(StyledBadge);

export const StyledBadgeWrapper = styled(Box)`
  display: inline-flex;
  position: relative;

  ${StyledBadge} {
    position: absolute;
    top: 0;
    right: 8px;
  }
`;
