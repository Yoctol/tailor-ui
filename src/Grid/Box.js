import styled from 'styled-components';
import * as system from 'styled-system';

const Box = styled.div`
  box-sizing: border-box;

  ${system.position /* sc-declaration */}
  ${system.display /* sc-declaration */}
  ${system.space /* sc-declaration */}
  ${system.fontSize /* sc-declaration */}
  ${system.color /* sc-declaration */}

  ${system.width /* sc-declaration */}
  ${system.minWidth /* sc-declaration */}
  ${system.maxWidth /* sc-declaration */}

  ${system.height /* sc-declaration */}
  ${system.minHeight /* sc-declaration */}
  /* stylelint-disable */
  ${system.maxHeight /* sc-declaration */}
  /* stylelint-enable */

  ${system.flex /* sc-declaration */}
  ${system.order /* sc-declaration */}
  ${system.alignSelf /* sc-declaration */}
`;

export default Box;
