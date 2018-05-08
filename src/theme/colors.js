import { darken, lighten } from 'polished';

const grayLevels = [0.03, 0.05, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.95];

export const primary = '#0E0C1A';
export const primaryDark = darken(0.03, primary);
export const primaryLight = lighten(0.03, primary);

export const secondary = '#80BDC7';
export const secondaryDark = darken(0.03, secondary);
export const secondaryLight = lighten(0.03, secondary);

export const dark = '#303030';
export const light = '#fff';
export const gray = grayLevels.map(level => lighten(level, dark));

export const success = '#63BF2D';
export const warning = '#DE8A15';
export const error = '#DA3333';

export const border = lighten(0.6, dark);
export const borderDark = darken(0.1, border);
export const bg = lighten(0.66, dark);
export const bgDark = darken(0.03, bg);
export const bgLight = light;

export const bodyBg = bgLight;
export const bodyFont = lighten(0.05, dark);
export const link = primary;
export const linkDark = darken(0.05, link);
