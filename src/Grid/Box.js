import styled from 'styled-components';
import * as system from 'styled-system';

const Box = styled.div`
  box-sizing: border-box;

  ${system.position};
  ${system.display};
  ${system.space};
  ${system.fontSize};
  ${system.color};

  ${system.width};
  ${system.minWidth};
  ${system.maxWidth};

  ${system.height};
  ${system.minHeight};
  /* stylelint-disable */
  ${system.maxHeight};
  /* stylelint-enable */

  ${system.flex};
  ${system.order};
  ${system.alignSelf};
`;

export default Box;
