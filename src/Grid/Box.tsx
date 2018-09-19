import styled from 'styled-components';
import * as system from 'styled-system';
import {
  PositionProps,
  TopProps,
  RightProps,
  BottomProps,
  LeftProps,
  DisplayProps,
  SpaceProps,
  FontSizeProps,
  ColorProps,
  BordersProps,
  BorderColorProps,
  BorderRadiusProps,
  WidthProps,
  MinWidthProps,
  MaxWidthProps,
  HeightProps,
  MinHeightProps,
  MaxHeightProps,
  FlexProps,
  OrderProps,
  AlignSelfProps,
} from 'styled-system';

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

export type BoxProps = PositionProps &
  TopProps &
  RightProps &
  BottomProps &
  LeftProps &
  DisplayProps &
  SpaceProps &
  FontSizeProps &
  ColorProps &
  BordersProps &
  BorderColorProps &
  BorderRadiusProps &
  WidthProps &
  MinWidthProps &
  MaxWidthProps &
  HeightProps &
  MinHeightProps &
  MaxHeightProps &
  FlexProps &
  OrderProps &
  AlignSelfProps & {
    overflow?: string;
    overflowX?: string;
    overflowY?: string;
  };

const Box = styled<BoxProps, 'div'>('div')`
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

export default Box;
