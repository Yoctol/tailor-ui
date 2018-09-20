import { rem } from 'polished';

const colors = {
  primary: '#423b63',
  primaryDark: '#2a2640',
  primaryLight: '#423b63',

  secondary: '#c7ad8d',
  secondaryDark: '#ab9272',
  secondaryLight: '#e6d1b7',

  dark: '#111111',
  light: '#ffffff',
  gray: [
    '#1e1e1e', // 0
    '#2b2b2b', // 1
    '#373737', // 2
    '#444444', // 3
    '#5e5e5e', // 4
    '#919191', // 5
    '#aaaaaa', // 6
    '#c3c3c3', // 7
    '#e9e9e9', // 8
    '#f7f7f7', // 9
  ],

  success: '#30be72',
  warning: '#de8a15',
  error: '#e65541', // FIXME: remove this line later
  danger: '#e65541',
  info: '#4384f0',

  code: '#e06870',
  highlight: '#ffe9b3',
};

const toRem = (px: number) => rem(`${px}px`);

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

const transition = 'transition: all 200ms ease 0s';

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
