import styled from 'styled-components';

import tag from '../utils/CleanTag';

const Label = styled(tag.label)`
  display: block;
  font-size: ${p => p.theme.fontSizes.base};
  font-weight: 500;
  letter-spacing: 0.2px;
`;

export default Label;
