import React, { SFC } from 'react';
import styled from 'styled-components';
import {
  height,
  space,
  themeGet,
  SpaceProps,
  HeightProps,
} from 'styled-system';

const StyledBlock = styled.div`
  position: relative;
  border-bottom: ${themeGet('borders.base')};
  border-color: ${themeGet('colors.gray.8')};
  font-size: ${p => p.theme.fontSizes.base};

  &:last-child {
    border-bottom: 0;
  }

  ${space};
  ${height};
`;

export type BlockProps = SpaceProps & HeightProps;

const Block: SFC<BlockProps> = props => <StyledBlock {...props} />;

export default Block;
