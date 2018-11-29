import { rem } from 'polished';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

const Hint = styled(tag.div)`
  margin-top: ${p => p.theme.space[1]};
  color: ${p => p.theme.colors.gray400};
  font-size: ${rem('12px')};
`;

export default Hint;
