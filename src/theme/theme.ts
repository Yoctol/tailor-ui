import { rem } from 'polished';

const colors = {
  primary: '#328ef5',
  primaryLight: '#3990cd',
  primaryLight2: '#a2d3ff',
  primaryDark: '#1d70b8',
  primaryDark2: '#0b4278',

  secondary: '#3dc8ff',
  secondaryLight: '#50acff',
  secondaryDark: '#0097cc',

  surface: '#eef1f8',
  surface2: '#fbfbfd',

  dark: '#000000',
  light: '#ffffff',

  gray100: '#f6f8fb',
  gray200: '#dee5ef',
  gray300: '#c4cfdd',
  gray400: '#97a4ba',
  gray500: '#67758d',
  gray600: '#424b5f',
  gray700: '#283040',
  gray800: '#191d28',

  success: '#51c81c',
  danger: '#ff5757',
  warning: '#fcb41d',
  info: '#328ef5',
  error: '#ff5757',
};

const darkerColors = {
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
}

const breakpoints: BreakpointsType = [
  toRem(576),
  toRem(768),
  toRem(992),
  toRem(1200),
];

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
   * 0 1px 3px 0 #e0e0e0
   */
  sm: string;

  /**
   * 0 2px 4px 0 #e0e0e0
   */
  base: string;

  /**
   * 0 2px 6px 0 #e0e0e0
   */
  lg: string;

  /**
   * 0 5px 10px 0 #e0e0e0
   */
  xl: string;
}

const shadows: ShadowsType = {
  sm: '0 1px 3px 0 #C4CFDD',
  base: '0 2px 4px 0 #C4CFDD',
  lg: '0 2px 6px 0 #C4CFDD',
  xl: '0 5px 10px 0 #C4CFDD',
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

export const darkerTheme = {
  breakpoints,
  colors: darkerColors,
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
