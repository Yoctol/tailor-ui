import React from 'react';
import { ColorProps, SpaceProps, color, space } from 'styled-system';
import { rem } from 'polished';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';

export type HeadingBaseProps = SpaceProps &
  ColorProps & {
    gray?: boolean;
    grayHint?: boolean;
    grayLight?: boolean;
    white?: boolean;
  };

const HeadingBase = styled<HeadingBaseProps, 'p'>(tag.p)`
  margin: 0;
  color: ${p => p.theme.colors.primaryDark};
  font-weight: 500;
  line-height: 1.5;

  ${({ gray }) =>
    gray &&
    css`
      color: ${p => p.theme.colors.gray700};
    `}

  ${({ grayLight }) =>
    grayLight &&
    css`
      color: ${p => p.theme.colors.gray600};
    `}

  ${({ grayHint }) =>
    grayHint &&
    css`
      color: ${p => p.theme.colors.gray500};
    `}

  ${({ white }) =>
    white &&
    css`
      color: ${p => p.theme.colors.light};
    `}

  ${space};
  ${color};
`;

const h1 = styled<HeadingBaseProps, any>((props: any) => (
  <HeadingBase as={tag.h1} {...props} />
))`
  font-size: ${rem('28px')};
`;

const h2 = styled<HeadingBaseProps, any>((props: any) => (
  <HeadingBase as={tag.h2} {...props} />
))`
  font-size: ${rem('24px')};
`;

const h3 = styled<HeadingBaseProps, any>((props: any) => (
  <HeadingBase as={tag.h3} {...props} />
))`
  font-size: ${rem('18px')};
`;

const h4 = styled<HeadingBaseProps, any>((props: any) => (
  <HeadingBase as={tag.h4} {...props} />
))`
  font-size: ${rem('16px')};
`;

const h5 = styled<HeadingBaseProps, any>((props: any) => (
  <HeadingBase as={tag.h5} {...props} />
))`
  font-size: ${rem('14px')};
`;

const h6 = styled<HeadingBaseProps, any>((props: any) => (
  <HeadingBase as={tag.h6} {...props} />
))`
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
