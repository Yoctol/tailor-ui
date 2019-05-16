import styled, { css } from 'styled-components';
import { ColorProps, SpaceProps, color, space } from 'styled-system';
import { rem } from 'polished';

export type HeadingBaseProps = SpaceProps & ColorProps;

const headingStyles = css`
  margin: 0;
  color: ${p => p.theme.colors.gray700};
  font-weight: bold;
  line-height: 1.5;

  ${space};
  ${color};
`;

const hero = styled.h1<HeadingBaseProps>`
  font-size: ${rem('32px')};
  ${headingStyles};
`;

const h1 = styled.h1<HeadingBaseProps>`
  font-size: ${rem('28px')};
  ${headingStyles};
`;

const h2 = styled.h2<HeadingBaseProps>`
  font-size: ${rem('24px')};
  ${headingStyles};
`;

const h3 = styled.h3<HeadingBaseProps>`
  font-size: ${rem('20px')};
  ${headingStyles};
`;

const h4 = styled.h4<HeadingBaseProps>`
  font-size: ${rem('18px')};
  ${headingStyles};
`;

const h5 = styled.h5<HeadingBaseProps>`
  font-size: ${rem('16px')};
  ${headingStyles};
`;

const h6 = styled.h6<HeadingBaseProps>`
  font-size: ${rem('14px')};
  ${headingStyles};
`;

export default {
  hero,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};
