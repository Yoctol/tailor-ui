import * as colors from './colors';

const lineHeight = '1rem';

const breakpoints = ['40em', '52em', '64em'];

const unit = {
  o: '.05rem',
  h: '.1rem',
  0: 0,
  1: '.2rem',
  2: '.4rem',
  3: '.6rem',
  4: '.8rem',
  5: '1rem',
  6: '1.2rem',
  7: '1.4rem',
  8: '1.6rem',
  9: '1.8rem',
  10: '2rem',
  12: '2.4rem',
  16: '3.2rem',
};

const fontSizes = {
  default: '.8rem',
  sm: '.7rem',
  lg: '.9rem',
};

// border-radius
const radii = [unit[1]];

const borderDefault = unit.o;
const borderLg = unit.h;

const borders = {
  none: '',
  default: `${borderDefault} solid`,
  lg: `${borderLg} solid`,
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

const space = {
  ...unit,
  ...layouts,
  ...controls,
};

const theme = {
  breakpoints,
  colors,
  space,
  fontSizes,
  radii,
  borders,
  controls,
  borderColor: colors,
};

export default theme;
