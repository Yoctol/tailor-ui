import React, { SFC } from 'react';
import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

const StyledImage = styled.div`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

export type ImageProps = SpaceProps;

const Image: SFC<ImageProps> = props => <StyledImage {...props} />;

export default Image;
