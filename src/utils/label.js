import { css } from 'styled-components';

import { defaultTheme as theme } from '../theme';

export const labelBase = () => css`
  padding: 0.1rem 0.15rem;
  border-radius: ${theme.radii[1]};
  line-height: 1.2;
`;

export const labelVariant = (
  color = theme.colors.light,
  bg = theme.colors.primary
) => css`
  background: ${bg};
  color: ${color};
`;
