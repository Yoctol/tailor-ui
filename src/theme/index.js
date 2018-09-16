import { css } from 'styled-components';
import { rem } from 'polished';

import * as colors from './colors';

const toRem = px => rem(`${px}px`);

const breakpoints = ['40em', '52em', '64em'];

const space = [0, 4, 8, 16, 32, 64, 128, 256].map(toRem);

const paddings = {
  lg: rem('24px'),
  md: rem('16px'),
  sm: rem('12px'),
  xs: rem('8px'),
};

const heights = {
  base: rem('32px'),
  sm: rem('24px'),
  lg: rem('40px'),
};

const fontSizes = {
  base: rem('16px'),
  sm: rem('14px'),
  lg: rem('18px'),
};

// border-radius
const radii = {
  sm: rem('2px'),
  base: rem('4px'),
  lg: rem('8px'),
};

const borders = {
  base: '1px solid',
};

const transition = css`
  transition: all 200ms ease 0s;
`;

const shadows = [
  '0 1px 4px 0 rgba(191, 191, 191, 0.5)',
  '0 4px 6px 0 rgba(191, 191, 191, 0.5)',
  '0 2px 6px 0 rgba(94, 94, 94, 0.5)',
];

export default {
  breakpoints,
  colors,
  space,
  paddings,
  heights,
  fontSizes,
  radii,
  borders,
  shadows,
  lineHeight: 1.5,
  transition,
};
