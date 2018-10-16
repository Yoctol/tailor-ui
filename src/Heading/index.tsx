import React from 'react';
import { ColorProps, SpaceProps, color, space } from 'styled-system';
import { rem } from 'polished';

import styled, { css } from 'utils/styled-components';

export type HeadingBaseProps = SpaceProps &
  ColorProps & {
    gray?: boolean;
    grayHint?: boolean;
    grayLight?: boolean;
    white?: boolean;
  };

const HeadingBase = styled<HeadingBaseProps, 'p'>('p')`
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
  ${color}
`;

const h1 = styled(props => <HeadingBase as="h1" {...props} />)`
  font-size: ${rem('28px')};
`;

const h2 = styled(props => <HeadingBase as="h2" {...props} />)`
  font-size: ${rem('24px')};
`;

const h3 = styled(props => <HeadingBase as="h3" {...props} />)`
  font-size: ${rem('18px')};
`;

const h4 = styled(props => <HeadingBase as="h4" {...props} />)`
  font-size: ${rem('16px')};
`;

const h5 = styled(props => <HeadingBase as="h5" {...props} />)`
  font-size: ${rem('14px')};
`;

const h6 = styled(props => <HeadingBase as="h6" {...props} />)`
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
