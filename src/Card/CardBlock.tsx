import React, { SFC } from 'react';
import {
  HeightProps,
  SpaceProps,
  height,
  space,
  themeGet,
} from 'styled-system';

import styled from 'utils/styled-components';

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

Block.defaultProps = {
  p: 3,
};

export default Block;
