import { SpaceProps, space } from 'styled-system';

import styled from 'utils/styled-components';

export { SpaceProps };

const Space = styled<SpaceProps, 'div'>('div')`
  ${space};
`;

export default Space;
