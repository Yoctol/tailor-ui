import { css } from 'styled-components';
import { rgba } from 'polished';

export const controlShadow = colorOrPropsHandler => {
  const getShadowCss = color => css`
    box-shadow: 0 0 0 0.1rem ${rgba(color, 0.2)};
  `;

  if (typeof colorOrPropsHandler === 'function') {
    return props => getShadowCss(colorOrPropsHandler(props));
  }

  return getShadowCss(colorOrPropsHandler);
};
