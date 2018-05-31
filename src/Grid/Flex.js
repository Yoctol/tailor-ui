import styled from 'styled-components';
import * as system from 'styled-system';

import Box from './Box';

const Flex = styled(Box)`
  display: flex;

  ${system.alignItems};
  ${system.flexDirection};
  ${system.justifyContent};
  ${system.flexWrap};
`;

export default Flex;
