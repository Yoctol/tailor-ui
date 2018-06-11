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

const Box = styled.div`
  box-sizing: border-box;

  ${system.position};
  ${system.top};
  ${system.right};
  ${system.bottom};
  ${system.left};
  ${overflow};
  ${overflowX};
  ${overflowY};

  ${system.display};
  ${system.space};
  /* stylelint-disable */
  ${system.fontSize};
  /* stylelint-enable */
  ${system.color};

  ${system.borders};
  ${system.borderColor};
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
