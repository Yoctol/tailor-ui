import styled from 'styled-components';
import {
  ColorProps,
  FontFamilyProps,
  FontSizeProps,
  FontWeightProps,
  LetterSpacingProps,
  LineHeightProps,
  TextAlignProps,
  color,
  compose,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
} from 'styled-system';

export type TextProps = ColorProps &
  FontFamilyProps &
  FontSizeProps &
  FontWeightProps &
  LetterSpacingProps &
  LineHeightProps &
  TextAlignProps;

export const text = compose(
  color,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign
);

const Text = styled('span')<TextProps>(text);

export { Text };
