import styled from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

const Label = styled<ICssProps, 'div'>(tag.div)`
  display: block;
  padding-bottom: ${p => p.theme.space[2]};
  font-size: ${p => p.theme.fontSizes.sm};
  line-height: 1;

  ${styledCss};
`;

export default Label;
