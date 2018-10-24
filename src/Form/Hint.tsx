import { rem } from 'polished';

import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

const Hint = styled<ICssProps>(tag.div)`
  margin-top: ${p => p.theme.space[1]};
  color: ${p => p.theme.colors.gray400};
  font-size: ${rem('12px')};

  ${styledCss};
`;

export default Hint;
