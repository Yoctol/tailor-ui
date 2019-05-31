import { rem } from 'polished';

const colors = {
  // primary
  primary: '#3c5ad0',
  primaryDark: '#184480',
  primaryDark2: '#001e40',
  primaryLight: '#6B88c5',
  primaryLight2: '#d5d8e8',

  // secondary
  secondary: '#50d5ff',
  secondaryDark: '#2db8de',

  // surface
  surface: '#e8ecf5',
  surface2: '#f8f8fc',

  dark: '#000000',
  light: '#ffffff',

  // gray
  gray100: '#fafafa',
  gray200: '#f6f6f6',
  gray300: '#e0e0e0',
  gray400: '#bfbfbf',
  gray500: '#8b8b8b',
  gray600: '#5e5e5e',
  gray700: '#373737',
  gray800: '#1a1a1a',

  // status
  success: '#40d064',
  danger: '#fc5475',
  warning: '#f6a700',
  info: '#4384f0',
  error: '#fc5475', // FIXME: remove this line later
};

const toRem = (px: number) => rem(`${px}px`);

const breakpoints = [toRem(576), toRem(768), toRem(992), toRem(1200)];
(breakpoints as any).sm = breakpoints[0];
(breakpoints as any).md = breakpoints[1];
(breakpoints as any).lg = breakpoints[2];
(breakpoints as any).xl = breakpoints[3];

const space = [0, 4, 8, 16, 32, 64, 128, 256].map(toRem);

const paddings = {
  lg: rem('24px'),
  md: rem('16px'),
  sm: rem('12px'),
  xs: rem('8px'),
};

const heights = {
  sm: rem('28px'),
  base: rem('36px'),
  lg: rem('44px'),
};

const fontSizes = {
  sm: rem('14px'),
  base: rem('16px'),
  lg: rem('18px'),
};

// border-radius
const radii = {
  sm: rem('2px'),
  base: rem('4px'),
  lg: rem('8px'),
  xl: rem('16px'),
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
