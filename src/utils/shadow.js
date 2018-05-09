import { css } from 'styled-components';
import { rgba } from 'polished';

import { dark } from '../theme/colors';

export const controlShadow = colorOrPropsHandler => {
  const getShadowCss = color => css`
    box-shadow: 0 0 0 0.1rem ${rgba(color, 0.2)};
  `;

  if (typeof colorOrPropsHandler === 'function') {
    return props => getShadowCss(colorOrPropsHandler(props));
  }

  return getShadowCss(colorOrPropsHandler);
};

export const shadowVariant = offset => css`
  box-shadow: 0 ${offset}rem ${(offset + 0.1) * 2}rem ${rgba(dark, 0.2)};
`;
