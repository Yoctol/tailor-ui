import { SpaceProps, space } from 'styled-system';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

const Space = styled<SpaceProps, 'div'>(tag.div)`
  ${space};
`;

export default Space;
