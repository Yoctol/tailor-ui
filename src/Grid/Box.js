import React from 'react';
import styled from 'styled-components';
import * as system from 'styled-system';

const overflow = system.style({
  prop: 'overflow',
  cssProperty: 'overflow',
});

const overflowX = system.style({
  prop: 'overflowX',
  cssProperty: 'overflow-x',
});

const overflowY = system.style({
  prop: 'overflowY',
  cssProperty: 'overflow-y',
});

const StyledBox = styled.div`
  box-sizing: border-box;

  ${system.position /* sc-declaration */}
  ${system.top /* sc-declaration */}
  ${system.right /* sc-declaration */}
  ${system.bottom /* sc-declaration */}
  ${system.left /* sc-declaration */}
  ${overflow /* sc-declaration */}
  ${overflowX /* sc-declaration */}
  ${overflowY /* sc-declaration */}

  ${system.display /* sc-declaration */}
  ${system.space /* sc-declaration */}
  /* stylelint-disable-next-line */
  ${system.fontSize /* sc-declaration */}
  ${system.color /* sc-declaration */}

  ${system.borders /* sc-declaration */}
  ${system.borderColor /* sc-declaration */}
  ${system.borderRadius /* sc-declaration */}

  ${system.width /* sc-declaration */}
  ${system.minWidth /* sc-declaration */}
  ${system.maxWidth /* sc-declaration */}

  ${system.height /* sc-declaration */}
  ${system.minHeight /* sc-declaration */}
  ${system.maxHeight /* sc-declaration */}

  ${system.flex /* sc-declaration */}
  ${system.order /* sc-declaration */}
  ${system.alignSelf /* sc-declaration */}
`;

const Box = ({ children, ...props }) => (
  <StyledBox {...props}>{children}</StyledBox>
);

Box.propTypes = {
  ...system.position.propTypes,
  ...system.top.propTypes,
  ...system.right.propTypes,
  ...system.bottom.propTypes,
  ...system.left.propTypes,
  ...overflow.propTypes,

  ...system.display.propTypes,
  ...system.space.propTypes,
  ...system.fontSize.propTypes,
  ...system.color.propTypes,

  ...system.borders.propTypes,
  ...system.borderColor.propTypes,
  ...system.borderRadius.propTypes,

  ...system.width.propTypes,
  ...system.minWidth.propTypes,
  ...system.maxWidth.propTypes,

  ...system.height.propTypes,
  ...system.minHeight.propTypes,
  ...system.maxHeight.propTypes,

  ...system.flex.propTypes,
  ...system.order.propTypes,
  ...system.alignSelf.propTypes,
};

export default Box;
