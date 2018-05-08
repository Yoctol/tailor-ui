import * as colors from './colors';

const lineHeight = '1rem';

const breakpoints = ['40em', '52em', '64em'];

const space = {
  o: '.05rem',
  h: '.1rem',
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
const radii = [space[1]];

const borders = {
  none: '',
  default: `${space.o} solid`,
  lg: `${space.h} solid`,
};

const size = space[9];
const sizeSm = space[7];
const sizeLg = space[10];

const controls = {
  size,
  sizeSm,
  sizeLg,
  paddingX: space[2],
  paddingXSm: space[2] * 0.75,
  paddingXLg: space[2] * 1.5,
  paddingY: (size - lineHeight) / 2 - borders.default,
  paddingYSm: (sizeSm - lineHeight) / 2 - borders.default,
  paddingYLg: (sizeLg - lineHeight) / 2 - borders.default,
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
