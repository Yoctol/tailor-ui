import { css } from 'styled-components';
import { map } from 'ramda';
import { rem } from 'polished';

import * as colors from './colors';

const toRem = px => rem(`${px}px`);

const lineHeight = 24;

const breakpoints = ['40em', '52em', '64em'];

const unit = {
  o: 1,
  h: 2,
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
};

const fontSizes = {
  default: rem('16px'),
  sm: rem('14px'),
  lg: rem('18px'),
};

// border-radius
const radii = [0, toRem(unit[1]), toRem(unit[2])];

const borderDefault = unit.o;
const borderLg = unit.h;
const borderXl = unit[2];

const borders = {
  none: '',
  default: `${toRem(borderDefault)} solid`,
  defaultRem: toRem(borderDefault),
  lg: `${toRem(borderLg)} solid`,
  lgRem: toRem(borderLg),
  xl: `${toRem(borderXl)} solid`,
};

const layouts = {
  spacing: unit[2],
  spacingSm: unit[1],
  spacingLg: unit[4],
};

const size = unit[9];
const sizeSm = unit[7];
const sizeLg = unit[10];

const controls = {
  size,
  sizeSm,
  sizeLg,
  paddingX: unit[2],
  paddingXSm: unit[2] * 0.75,
  paddingXLg: unit[2] * 1.5,
  paddingY: (size - lineHeight) / 2 - borderDefault,
  paddingYSm: (sizeSm - lineHeight) / 2 - borderDefault,
  paddingYLg: (sizeLg - lineHeight) / 2 - borderDefault,
};

const space = map(toRem, {
  ...unit,
  ...layouts,
  ...controls,
});

const sizes = {
  sm: {
    padding: `${space.paddingYSm} ${space.paddingXSm}`,
    fontSize: fontSizes.sm,
  },
  m: {
    padding: `${space.paddingY} ${space.paddingX}`,
    fontSize: fontSizes.default,
  },
  lg: {
    padding: `${space.paddingYLg} ${space.paddingXLg}`,
    fontSize: fontSizes.lg,
  },
};

const transition = css`
  transition: all 200ms ease 0s;
`;

export default {
  breakpoints,
  colors,
  space,
  fontSizes,
  sizes,
  radii,
  borders,
  controls,
  borderColor: colors,
  lineHeight: toRem(lineHeight),
  transition,
};
