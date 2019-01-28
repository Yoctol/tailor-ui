import styled from 'styled-components';
import * as system from 'styled-system';

import tag from 'utils/CleanTag';

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

export type BoxProps = system.PositionProps &
  system.TopProps &
  system.RightProps &
  system.BottomProps &
  system.LeftProps &
  system.ZIndexProps &
  system.DisplayProps &
  system.SpaceProps &
  system.LineHeightProps &
  system.BackgroundProps &
  system.FontSizeProps &
  system.TextAlignProps &
  system.ColorProps &
  system.BordersProps &
  system.BorderColorProps &
  system.BorderRadiusProps &
  system.WidthProps &
  system.MinWidthProps &
  system.MaxWidthProps &
  system.HeightProps &
  system.MinHeightProps &
  system.MaxHeightProps &
  system.FlexProps &
  system.OrderProps &
  system.AlignSelfProps & {
    overflow?: string;
    overflowX?: string;
    overflowY?: string;
  };

const Box = styled(tag.div)<BoxProps>`
  box-sizing: border-box;

  ${system.position /* sc-declaration */}
  ${system.top /* sc-declaration */}
  ${system.right /* sc-declaration */}
  ${system.bottom /* sc-declaration */}
  ${system.left /* sc-declaration */}
  ${overflow /* sc-declaration */}
  ${overflowX /* sc-declaration */}
  ${overflowY /* sc-declaration */}

  ${system.zIndex /* sc-declaration */}
  ${system.display /* sc-declaration */}
  /* stylelint-disable-next-line */
  ${system.space /* sc-declaration */}
  ${system.lineHeight /* sc-declaration */}
  ${system.background /* sc-declaration */}
  ${system.fontSize /* sc-declaration */}
  ${system.textAlign /* sc-declaration */}
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
