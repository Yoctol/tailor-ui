import React from 'react';
import styled from 'styled-components';
import { ColorProps, SpaceProps, color, space } from 'styled-system';
import { rem } from 'polished';

import tag from '../utils/CleanTag';

export type HeadingBaseProps = SpaceProps & ColorProps;

const HeadingBase = styled(tag.p)<HeadingBaseProps>`
  margin: 0;
  color: ${p => p.theme.colors.gray700};
  font-weight: bold;
  line-height: 1.5;

  ${space};
  ${color};
`;

const hero = styled((props: any) => <HeadingBase as={tag.h1} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('32px')};
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
  font-size: ${rem('20px')};
`;

const h4 = styled((props: any) => <HeadingBase as={tag.h4} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('18px')};
`;

const h5 = styled((props: any) => <HeadingBase as={tag.h5} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('16px')};
`;

const h6 = styled((props: any) => <HeadingBase as={tag.h6} {...props} />)<
  HeadingBaseProps
>`
  font-size: ${rem('14px')};
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
