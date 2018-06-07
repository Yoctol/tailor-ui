import styled from 'styled-components';
import * as system from 'styled-system';

const overflow = system.style({
  prop: 'overflow',
  cssProperty: 'overflow',
  key: 'overflows',
  alias: 'of',
});

const Box = styled.div`
  box-sizing: border-box;

  ${system.position};
  ${system.top};
  ${system.right};
  ${system.bottom};
  ${system.left};
  ${overflow};

  ${system.display};
  ${system.space};
  ${system.fontSize};
  ${system.color};

  /* stylelint-disable */
  ${system.borders};
  /* stylelint-enable */
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
