import styled from 'styled-components';
import {
  ColorProps,
  FontFamilyProps,
  FontWeightProps,
  LetterSpacingProps,
  LineHeightProps,
  TextAlignProps,
  color,
  compose,
  fontFamily,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
} from 'styled-system';

export type TextProps = ColorProps &
  FontFamilyProps &
  FontWeightProps &
  LetterSpacingProps &
  LineHeightProps &
  TextAlignProps;

export const text = compose(
  color,
  fontFamily,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign
);

const Text = styled('p')({ margin: 0 }, text);

export default Text;
