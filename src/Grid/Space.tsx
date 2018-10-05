import { SpaceProps, space } from 'styled-system';

import styled from 'utils/styled-components';

const Space = styled<SpaceProps, 'div'>('div')`
  ${space};
`;

export default Space;
