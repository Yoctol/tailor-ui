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

import styled from 'utils/styled-components';

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
