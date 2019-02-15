import React from 'react';
import styled, { css } from 'styled-components';
import { ColorProps, SpaceProps, color, space } from 'styled-system';
import { rem } from 'polished';

import tag from '../utils/CleanTag';

export type HeadingBaseProps = SpaceProps &
  ColorProps & {
    gray?: boolean;
    grayHint?: boolean;
    grayLight?: boolean;
    white?: boolean;
  };

const HeadingBase = styled(tag.p)<HeadingBaseProps>`
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

const h1 = styled((props: any) => <HeadingBase as={tag.h1} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('28px')};
`;

const h2 = styled((props: any) => <HeadingBase as={tag.h2} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('24px')};
`;

const h3 = styled((props: any) => <HeadingBase as={tag.h3} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('18px')};
`;

const h4 = styled((props: any) => <HeadingBase as={tag.h4} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('16px')};
`;

const h5 = styled((props: any) => <HeadingBase as={tag.h5} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('14px')};
`;

const h6 = styled((props: any) => <HeadingBase as={tag.h6} {...props} />)<
  HeadingBaseProps
>`
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
