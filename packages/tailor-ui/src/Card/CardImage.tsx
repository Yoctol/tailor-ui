import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

export type ImageProps = SpaceProps;

export const StyledImage = styled.div<ImageProps>`
  overflow: hidden;

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ${space};
`;

const Image: FunctionComponent<ImageProps> = props => (
  <StyledImage {...props} />
);

export default Image;
