import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { HeightProps, SpaceProps, height, space } from 'styled-system';

import tag from 'utils/CleanTag';

export type BlockProps = SpaceProps & HeightProps;

const StyledBlock = styled(tag.div)<BlockProps>`
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

const Block: FunctionComponent<BlockProps> = props => (
  <StyledBlock {...props} />
);

Block.defaultProps = {
  p: 3,
};

export default Block;
