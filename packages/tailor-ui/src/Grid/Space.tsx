import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

import tag from '../utils/CleanTag';

const Space = styled(tag.div)<SpaceProps>`
  ${space};
`;

export default Space;
