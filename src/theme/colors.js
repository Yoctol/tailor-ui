import { darken, lighten } from 'polished';

const grayLevels = [0.05, 0.1, 0.15, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9];

export const primary = '#2f2a4a';
export const primaryDark = '#0e0c1a';
export const primaryLight = '#423b63';

export const secondary = '#80bdc7';
export const secondaryDark = '#59a6b3';
export const secondaryLight = '#9fdfea';

export const dark = '#111';
export const light = '#fff';
export const gray = grayLevels.map(level => lighten(level, dark));

export const success = '#63bf2d';
export const warning = '#de8a15';
export const error = '#da3333';

export const border = '#dddddd';
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
