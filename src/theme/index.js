import mapValues from 'lodash/mapValues';
import round from 'lodash/round';

import * as colors from './colors';

const toRem = rem => `${rem}rem`;

const lineHeight = 1;

const breakpoints = ['40em', '52em', '64em'];

const unit = {
  o: 0.05,
  h: 0.1,
  0: 0,
  1: 0.2,
  2: 0.4,
  3: 0.6,
  4: 0.8,
  5: 1,
  6: 1.2,
  7: 1.4,
  8: 1.6,
  9: 1.8,
  10: 2,
  12: 2.4,
  16: 3.2,
};

const fontSizes = {
  default: '.8rem',
  sm: '.7rem',
  lg: '.9rem',
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

const space = mapValues(
  {
    ...unit,
    ...layouts,
    ...controls,
  },
  value => toRem(round(value, 2))
);

const theme = {
  breakpoints,
  colors,
  space,
  fontSizes,
  radii,
  borders,
  controls,
  borderColor: colors,
  lineHeight: toRem(lineHeight),
};

export default theme;
