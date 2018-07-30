import React from 'react';
import styled from 'styled-components';
import {
  alignItems,
  flexDirection,
  flexWrap,
  justifyContent,
} from 'styled-system';

import Box, { StyledBox } from './Box';

const StyledFlex = styled(StyledBox)`
  display: flex;

  ${alignItems};
  ${flexDirection};
  ${justifyContent};
  ${flexWrap};
`;

const Flex = ({ children, ref, ...props }) => (
  <StyledFlex innerRef={ref} {...props}>
    {children}
  </StyledFlex>
);

Flex.propTypes = {
  ...Box.propTypes,
  ...alignItems.propTypes,
  ...flexDirection.propTypes,
  ...justifyContent.propTypes,
  ...flexWrap.propTypes,
};

export default Flex;
