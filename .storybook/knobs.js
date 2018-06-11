import { text } from '@storybook/addon-knobs';

export const space = () => ({
  m: text('m', '', 'styled-system') || undefined,
  mt: text('mt', '', 'styled-system') || undefined,
  mr: text('mr', '', 'styled-system') || undefined,
  mb: text('mb', '', 'styled-system') || undefined,
  ml: text('ml', '', 'styled-system') || undefined,
  p: text('p', '', 'styled-system') || undefined,
  pt: text('pt', '', 'styled-system') || undefined,
  pr: text('pr', '', 'styled-system') || undefined,
  pb: text('pb', '', 'styled-system') || undefined,
  pl: text('pl', '', 'styled-system') || undefined,
});

export const minWidth = () => ({
  minWidth: text('minWidth', '', 'styled-system') || undefined,
});

export const color = () => ({
  bg: text('background-color (bg)', '', 'styled-system') || undefined,
  color: text('color', '', 'styled-system') || undefined,
});

export const borders = () => ({
  border: text('borders', '', 'styled-system') || undefined,
});

export const borderColor = () => ({
  borderColor: text('borderColor', '', 'styled-system') || undefined,
});

export const borderRadius = () => ({
  borderRadius: text('borderRadius', '', 'styled-system') || undefined,
});

export const fontSize = () => ({
  fontSize: text('fontSize', '', 'styled-system') || undefined,
});

export const textAlign = () => ({
  textAlign: text('textAlign', '', 'styled-system') || undefined,
});
