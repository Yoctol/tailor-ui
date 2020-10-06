import styled from 'styled-components';

import { BoxProps, box } from './Box';

export type FlexProps = BoxProps;

const Flex = styled('div')<FlexProps>(
  {
    display: 'flex',
    boxSizing: 'border-box',
  },
  box
);

export { Flex };
