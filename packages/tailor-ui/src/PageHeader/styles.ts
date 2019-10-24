import styled, { css } from 'styled-components';

import { Icon } from '../Icon';

interface StyledBreadcrumbLinkProps {
  lockWidth: boolean;
  active: boolean;
}

export const StyledBreadcrumbLink = styled.a<StyledBreadcrumbLinkProps>`
  max-width: ${p => (p.lockWidth ? '200px' : '100%')};
  color: ${p => p.theme.colors.gray400};
  font-size: ${p => p.theme.fontSizes.base};
  letter-spacing: 0.2px;
  white-space: pre-wrap;

  ${p =>
    p.active
      ? css`
          cursor: auto;
          color: ${p.theme.colors.gray700};
        `
      : css`
          &:hover {
            color: ${p.theme.colors.primary};
          }
        `}

  ${p => p.theme.transition}
`;

export const MoreIcon = styled(Icon)`
  &:hover svg {
    fill: ${p => p.theme.colors.primary} !important;
  }
`;
