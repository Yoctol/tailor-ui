import styled from 'styled-components';
import {
  ColorProps,
  TypographyProps,
  color,
  compose,
  typography,
} from 'styled-system';

export type TextProps = ColorProps & TypographyProps;

export const text = compose(color, typography);

const Text = styled('span')<TextProps>(text);

export { Text };
