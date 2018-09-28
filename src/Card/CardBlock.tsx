import React, { SFC } from 'react';
import { HeightProps, SpaceProps, height, space } from 'styled-system';

import styled from 'utils/styled-components';

const StyledBlock = styled.div`
  position: relative;
  border-bottom: ${p => p.theme.borders.base};
  border-color: ${p => p.theme.colors.gray300};
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
