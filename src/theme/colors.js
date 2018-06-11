import { darken, lighten } from 'polished';

export const primary = '#191723';
export const primaryDark = '#0e0c1a';
export const primaryLight = '#423b63';

export const secondaryBlue = {
  secondary: '#80bdc7',
  secondaryDark: '#63bed5',
  secondaryLight: '#9fdfea',
};

export const secondaryGreen = {
  secondary: '#56e495',
  secondaryDark: '#3fcc74',
  secondaryLight: '#9cffb9',
};

export const secondaryYellow = {
  secondary: '#C7AD8D',
  secondaryDark: '#AB9272',
  secondaryLight: '#E6D1B7',
};

export const secondaryRed = {
  secondary: '#F08181',
  secondaryDark: '#C26868',
  secondaryLight: '#FBADAD',
};

export const dark = '#111111';
export const light = '#ffffff';
export const gray = [
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
];

export const success = '#63bf2d';
export const warning = '#de8a15';
export const error = '#da3333';

export const border = '#e0e0e0';
export const borderDark = darken(0.1, border);
export const bg = lighten(0.66, dark);
export const bgDark = darken(0.03, bg);
export const bgLight = light;

export const code = '#e06870';
export const highlight = '#ffe9b3';
export const bodyBg = bgLight;
export const bodyFont = lighten(0.05, dark);
export const link = primary;
export const linkDark = darken(0.05, link);
