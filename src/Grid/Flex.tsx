import styled from 'styled-components';
import {
  alignItems,
  AlignItemsProps,
  flexDirection,
  FlexDirectionProps,
  flexWrap,
  FlexWrapProps,
  justifyContent,
  JustifyContentProps,
} from 'styled-system';

import Box, { BoxProps } from './Box';

export type FlexProps = BoxProps &
  AlignItemsProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps;

const Flex = styled<FlexProps, any>(Box)`
  display: flex;

  ${alignItems};
  ${flexDirection};
  ${justifyContent};
  ${flexWrap};
`;

export default Flex;
