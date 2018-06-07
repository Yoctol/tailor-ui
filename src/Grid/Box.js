import styled from 'styled-components';
import * as system from 'styled-system';

const Box = styled.div`
  box-sizing: border-box;

  ${system.position};
  ${system.top};
  ${system.right};
  ${system.bottom};
  ${system.left};

  ${system.display};
  ${system.space};
  ${system.fontSize};
  ${system.color};

  ${system.borders};
  /* stylelint-disable */
  ${system.borderColor};
  /* stylelint-enable */
  ${system.borderRadius};

  ${system.width};
  ${system.minWidth};
  ${system.maxWidth};

  ${system.height};
  ${system.minHeight};
  ${system.maxHeight};

  ${system.flex};
  ${system.order};
  ${system.alignSelf};
`;

export default Box;
