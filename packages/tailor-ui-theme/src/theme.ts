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
  secondaryLight: '#63a9f5',
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

export interface BreakpointsType {
  /**
   * 576px
   */
  0: string;
  /**
   * 768px
   */
  1: string;
  /**
   * 992px
   */
  2: string;
  /**
   * 1200px
   */
  3: string;
  /**
   * 576px
   */
  sm: string;
  /**
   * 768px
   */
  md: string;
  /**
   * 992px
   */
  lg: string;
  /**
   * 1200px
   */
  xl: string;
}

const breakpoints: BreakpointsType = {
  0: toRem(576),
  1: toRem(768),
  2: toRem(992),
  3: toRem(1200),
  sm: toRem(576),
  md: toRem(768),
  lg: toRem(992),
  xl: toRem(1200),
};

export interface SpaceType {
  /**
   * 0px
   */
  0: string;
  /**
   * 4px
   */
  1: string;
  /**
   * 8px
   */
  2: string;
  /**
   * 16px
   */
  3: string;
  /**
   * 32px
   */
  4: string;
  /**
   * 64px
   */
  5: string;
  /**
   * 128px
   */
  6: string;
  /**
   * 256px
   */
  7: string;
}

const space: SpaceType = {
  0: toRem(0),
  1: toRem(4),
  2: toRem(8),
  3: toRem(16),
  4: toRem(32),
  5: toRem(64),
  6: toRem(128),
  7: toRem(256),
};

export interface PaddingsType {
  /**
   * 8px
   */
  xs: string;
  /**
   * 12px
   */
  sm: string;
  /**
   * 16px
   */
  md: string;
  /**
   * 24px
   */
  lg: string;
}

const paddings: PaddingsType = {
  xs: rem('8px'),
  sm: rem('12px'),
  md: rem('16px'),
  lg: rem('24px'),
};

export interface HeightsType {
  /**
   * 28px
   */
  sm: string;
  /**
   * 36px
   */
  base: string;
  /**
   * 44px
   */
  lg: string;
}

const heights: HeightsType = {
  sm: rem('28px'),
  base: rem('36px'),
  lg: rem('44px'),
};

interface FontSizeType {
  /**
   * 14px
   */
  sm: string;
  /**
   * 16px
   */
  base: string;
  /**
   * 18px
   */
  lg: string;
}

const fontSizes: FontSizeType = {
  sm: rem('14px'),
  base: rem('16px'),
  lg: rem('18px'),
};

export interface RadiiType {
  /**
   * 2px
   */
  sm: string;
  /**
   * 4px
   */
  base: string;
  /**
   * 8px
   */
  lg: string;
  /**
   * 16px
   */
  xl: string;
}

// border-radius
const radii: RadiiType = {
  sm: rem('2px'),
  base: rem('4px'),
  lg: rem('8px'),
  xl: rem('16px'),
};

export interface BordersType {
  /**
   * 1px solid
   */
  base: string;

  /**
   * 2px solid
   */
  lg: string;

  /**
   * 1px dashed
   */
  dashed: string;
}

const borders: BordersType = {
  base: '1px solid',
  lg: '2px solid',
  dashed: '1px dashed',
};

const transition = 'transition: all 200ms ease 0s';

export interface ShadowsType {
  /**
   * '0 1px 4px 0 rgba(191, 191, 191, 0.5)'
   */
  base: string;

  /**
   * '0 4px 6px 0 rgba(191, 191, 191, 0.5)'
   */
  lg: string;

  /**
   * '0 2px 6px 0 rgba(94, 94, 94, 0.5)'
   */
  xl: string;
}

const shadows: ShadowsType = {
  base: '0 1px 4px 0 rgba(191, 191, 191, 0.5)',
  lg: '0 4px 6px 0 rgba(191, 191, 191, 0.5)',
  xl: '0 2px 6px 0 rgba(94, 94, 94, 0.5)',
};

export const theme = {
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
