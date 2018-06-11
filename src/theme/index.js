import { map } from 'ramda';

import * as defaultColors from './colors';

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

const space = map(value => toRem(Math.round(value * 100) / 100), {
  ...unit,
  ...layouts,
  ...controls,
});

const sizes = {
  sm: {
    height: space.sizeSm,
    padding: `${space.paddingYSm} ${space.paddingXSm}`,
    fontSize: fontSizes.sm,
  },
  m: {
    height: space.size,
    padding: `${space.paddingY} ${space.paddingX}`,
    fontSize: fontSizes.default,
  },
  lg: {
    height: space.sizeLg,
    padding: `${space.paddingYLg} ${space.paddingXLg}`,
    fontSize: fontSizes.lg,
  },
};

const {
  secondaryBlue,
  secondaryGreen,
  secondaryYellow,
  secondaryRed,
  ...otherColors
} = defaultColors;

const secondaryMap = {
  blue: secondaryBlue,
  green: secondaryGreen,
  yellow: secondaryYellow,
  red: secondaryRed,
};

const getTheme = secondaryType => {
  const secondary = secondaryMap[secondaryType];
  const colors = { ...secondary, ...otherColors };

  return {
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
  };
};

export default getTheme;

export const defaultTheme = getTheme('yellow');
