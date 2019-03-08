import { rem } from 'polished';

const colors = {
  // primary: '#423b63',
  // primaryDark: '#191539',
  // primaryLight: '#6e6591',
  primary: '#3c5ad0',
  primaryDark: '#184480',
  primaryDark2: '#001e40',
  primaryLight: '#6478a8',
  primaryLight2: '#d5d8e8',

  // secondary: '#c0a382',
  // secondaryDark: '#8f7455',
  // secondaryLight: '#f3d4b2',
  secondary: '#50d5ff',

  dark: '#000000',
  light: '#ffffff',
  gray100: '#fafafa',
  gray200: '#f6f6f6',
  gray300: '#e0e0e0',
  gray400: '#bfbfbf',
  gray500: '#8b8b8b',
  gray600: '#5e5e5e',
  gray700: '#373737',
  gray800: '#1a1a1a',

  // success: '#30be72',
  // danger: '#e65541',
  success: '#40d064',
  danger: '#fc5475',
  warning: '#de8a15',
  info: '#4384f0',
  error: '#e65541', // FIXME: remove this line later

  // code: '#e06870',
  // highlight: '#ffe9b3',

  // legacy gray
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
  dashed: '1px dashed',
};

const transition = 'transition: all 200ms ease 0s';

const shadows = {
  base: '0 1px 4px 0 rgba(191, 191, 191, 0.5)',
  lg: '0 4px 6px 0 rgba(191, 191, 191, 0.5)',
  xl: '0 2px 6px 0 rgba(94, 94, 94, 0.5)',
};

const theme = {
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

export type ThemeType = typeof theme;

export default theme;
