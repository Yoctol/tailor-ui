import styled, { css } from 'styled-components';
import { SpaceProps, compose, space } from 'styled-system';
import { rem } from 'polished';

import { TextProps, text } from './Text';

export type HeadingBaseProps = SpaceProps & TextProps;

const heading = compose(text, space);

const headingStyles = css`
  margin: 0;
  color: ${(p) => p.theme.colors.gray700};
  font-weight: bold;
  line-height: 1.5;

  ${heading};
`;

const Hero = styled.h1<HeadingBaseProps>`
  font-size: ${rem('32px')};
  ${headingStyles};
`;

const H1 = styled.h1<HeadingBaseProps>`
  font-size: ${rem('28px')};
  ${headingStyles};
`;

const H2 = styled.h2<HeadingBaseProps>`
  font-size: ${rem('24px')};
  ${headingStyles};
`;

const H3 = styled.h3<HeadingBaseProps>`
  font-size: ${rem('20px')};
  ${headingStyles};
`;

const H4 = styled.h4<HeadingBaseProps>`
  font-size: ${rem('18px')};
  ${headingStyles};
`;

const H5 = styled.h5<HeadingBaseProps>`
  font-size: ${rem('16px')};
  ${headingStyles};
`;

const H6 = styled.h6<HeadingBaseProps>`
  font-size: ${rem('14px')};
  ${headingStyles};
`;

export default {
  Hero,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
};
