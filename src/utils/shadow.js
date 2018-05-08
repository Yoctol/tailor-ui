import { css } from 'styled-components';
import { rgba } from 'polished';

export const controlShadow = color => css`
  box-shadow: 0 0 0 0.1rem ${rgba(color, 0.2)};
`;
