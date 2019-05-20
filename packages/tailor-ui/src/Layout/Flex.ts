import styled from 'styled-components';
import {
  AlignItemsProps,
  FlexDirectionProps,
  FlexWrapProps,
  JustifyContentProps,
  alignItems,
  compose,
  flexDirection,
  flexWrap,
  justifyContent,
} from 'styled-system';

import { BoxProps, box } from './Box';

export type FlexProps = BoxProps &
  AlignItemsProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps;

const flex = compose(
  box,
  alignItems,
  flexDirection,
  justifyContent,
  flexWrap
);

const Flex = styled('div')<FlexProps>(
  {
    display: 'flex',
    boxSizing: 'border-box',
  },
  flex
);

export default Flex;
