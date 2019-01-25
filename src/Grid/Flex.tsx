import styled from 'styled-components';
import {
  AlignItemsProps,
  FlexDirectionProps,
  FlexWrapProps,
  JustifyContentProps,
  alignItems,
  flexDirection,
  flexWrap,
  justifyContent,
} from 'styled-system';

import Box, { BoxProps } from './Box';

export type FlexProps = BoxProps &
  AlignItemsProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps;

const Flex = styled(Box)<FlexProps>`
  display: flex;

  ${alignItems};
  ${flexDirection};
  ${justifyContent};
  ${flexWrap};
`;

export default Flex;
