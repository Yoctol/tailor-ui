import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import { controlShadow } from '../utils/shadow';
import controlTransition from '../utils/transition';
import theme from '../theme';

const Input = styled.input`
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  border: ${themeGet('borders.default')} ${themeGet('colors.borderDark')};
  border-radius: ${themeGet('radii.1')};
  outline: none;
  background: ${themeGet('bgLight')};
  background-image: none;
  color: ${themeGet('colors.bodyFont')};
  line-height: ${themeGet('lineHeight')};
  appearance: none;

  &:focus {
    border-color: ${themeGet('colors.primary')};
    ${controlShadow()};
  }

  &:disabled,
  [disabled] {
    cursor: not-allowed;
    background-color: ${themeGet('colors.bgDark')};
    opacity: 0.5;
  }

  &::placeholder {
    color: ${themeGet('colors.gray.4')};
  }

  ${controlTransition()};

  ${switchProp('size', {
    sm: css`
      height: ${themeGet('space.sizeSm')};
      padding: ${themeGet('space.paddingYSm')} ${themeGet('space.paddingXSm')};
      font-size: ${themeGet('fontSizes.sm')};
    `,
    m: css`
      height: ${themeGet('space.size')};
      padding: ${themeGet('space.paddingY')} ${themeGet('space.paddingX')};
      font-size: ${themeGet('fontSizes.default')};
    `,
    lg: css`
      height: ${themeGet('space.sizeLg')};
      padding: ${themeGet('space.paddingYLg')} ${themeGet('space.paddingXLg')};
      font-size: ${themeGet('fontSizes.lg')};
    `,
  })};

  ${ifProp(
    'inline',
    css`
      display: inline-block;
      width: auto;
      vertical-align: middle;
    `
  )};
`;

Input.defaultProps = {
  theme,
  size: 'm',
};

export default Input;
