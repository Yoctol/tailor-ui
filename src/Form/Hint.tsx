import { rem } from 'polished';

import styled from 'utils/styled-components';

const Hint = styled.div`
  margin-top: ${p => p.theme.space[1]};
  color: ${p => p.theme.colors.gray[6]};
  font-size: ${rem('12px')};
`;

export default Hint;
