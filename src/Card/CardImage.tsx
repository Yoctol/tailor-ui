import React, { SFC } from 'react';
import { SpaceProps, space } from 'styled-system';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

export type ImageProps = SpaceProps & ICssProps;

export const StyledImage = styled<ImageProps, 'div'>(tag.div)`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
  ${styledCss};
`;

const Image: SFC<ImageProps> = props => <StyledImage {...props} />;

export default Image;
