import { SpaceProps, space } from 'styled-system';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

const Space = styled<SpaceProps & ICssProps, 'div'>(tag.div)`
  ${space};
  ${styledCss};
`;

export default Space;
