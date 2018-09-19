import styled, { css } from 'styled-components';
import { color, space, themeGet, SpaceProps, ColorProps } from 'styled-system';
import { rem } from 'polished';

export type HeadingBaseProps = SpaceProps &
  ColorProps & {
    gray?: boolean;
    grayHint?: boolean;
    grayLight?: boolean;
    white?: boolean;
  };

const HeadingBase = styled<HeadingBaseProps, 'p'>('p')`
  margin: 0;
  color: ${themeGet('colors.primaryDark')};
  font-weight: 500;
  line-height: 1.5;

  ${({ gray }) =>
    gray &&
    css`
      color: ${themeGet('colors.gray.2')};
    `}

  ${({ grayLight }) =>
    grayLight &&
    css`
      color: ${themeGet('colors.gray.4')};
    `}

  ${({ grayHint }) =>
    grayHint &&
    css`
      color: ${themeGet('colors.gray.5')};
    `}

  ${({ white }) =>
    white &&
    css`
      color: ${themeGet('colors.light')};
    `}

  ${space};
  ${color}
`;

const h1 = styled(HeadingBase.withComponent('h1'))`
  font-size: ${rem('28px')};
`;

const h2 = styled(HeadingBase.withComponent('h2'))`
  font-size: ${rem('24px')};
`;

const h3 = styled(HeadingBase.withComponent('h3'))`
  font-size: ${rem('18px')};
`;

const h4 = styled(HeadingBase.withComponent('h4'))`
  font-size: ${rem('16px')};
`;

const h5 = styled(HeadingBase.withComponent('h5'))`
  font-size: ${rem('14px')};
`;

const h6 = styled(HeadingBase.withComponent('h6'))`
  font-size: ${rem('12px')};
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};
