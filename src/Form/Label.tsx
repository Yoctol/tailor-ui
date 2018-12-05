import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';

const Label = styled(tag.label)`
  display: block;
  padding-bottom: ${p => p.theme.space[2]};
  font-size: ${p => p.theme.fontSizes.sm};
  line-height: 1;
`;

export default Label;
